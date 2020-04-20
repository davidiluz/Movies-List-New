var express = require('express');
var cors = require('cors')
var sql = require('mssql');
var app = express();

const config = {
    user: 'sa',
    password: 'Aa123456',
    server: 'localhost',
    database: 'Movies',
};
app.use(cors());
app.use(express.json())

var PORT = 3000;
app.get('/', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from Movies', function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset);
        });
    });
})
app.get('/movies/getAll', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query('select * from Movies', function (err, recordset) {
            if (err){
                console.log(err);
                res.status(404).send('Failed To Load All Movies');
            } 
            else
               res.send(recordset.recordsets[0]);
        });
    });
});

app.post('/movies/deleteMovie',function(req,res){
    sql.connect(config, function (err) {
        if (err) 
            console.log(err);
        var request = new sql.Request();
        console.log(req.body);
        request.input('id', sql.Int, req.body.id);
        request.query(`DELETE FROM MOVIES WHERE [Id]=@id`, function (err, recordset) {
            if (err) {
                res.status(404).send(`Failed To Delete Movie With Id ${req.body.id}.`)
            }
            else{
                console.log(recordset)
                res.send(req.body.id.toString());
            }
                
        });
    });
});

app.post('/movies/addOrUpdate', function (req, res) {
    sql.connect(config, function (err) {
        if (err) 
            console.log(err);
        var request = new sql.Request();
        var currentDate = new Date();
        request.input('name', sql.VarChar, req.body.name);
        request.input('year', sql.VarChar, req.body.year);
        request.input('cast', sql.VarChar, req.body.cast);
        request.input('director', sql.VarChar, req.body.director);
        request.input('description', sql.VarChar, req.body.description);
        request.input('awards', sql.VarChar, req.body.awards);
        request.input('writers', sql.VarChar, req.body.writers);
        request.input('creationUser', sql.VarChar, req.body.creationUser);
        request.input('currentDate', sql.DateTime2, currentDate);
        request.input('id', sql.Int, req.body.id);
        if (req.body.id == -1) {
            request.query(`INSERT INTO Movies([Name],[Year],[Cast],[Director]
                ,[Description],[Awards],[Writers],[LastUpdateDate]) VALUES
            (@name,@year,@cast,@director,@description,@awards,@writers,@currentDate)
            SELECT TOP(1) * FROM [Movies] order by [Id] desc`, function (err, recordset) {
                if (err) {
                    res.status(404).send(`Failed To Add Movie ${req.body.name}.`)
                }
                else
                    res.send(recordset.recordset[0]);
            });
        }
        else {
            request.query(`UPDATE Movies SET Name=@name ,Year=@year,Cast=@cast,
            Director=@director, Description=@description, Awards=@awards,
            Writers=@writers,LastUpdateDate=@currentDate WHERE [Id]=@id SELECT * FROM Movies WHERE [Id] = @id`, function (err, recordset) {
                if (err) {
                    res.status(404).send(`Failed To Update Movie ${req.body.name}.`)
                }
                else
                    res.send(recordset.recordset[0]);
            });
        }
    });
});

app.get('/login/:email/:password', function (req, res) {
    sql.connect(config, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('email', sql.VarChar, req.params.email);
        request.input('password', sql.VarChar, req.params.password);
        request.query('select * from Users where email = @email and password = @password', function (err, recordset) {
            if (err)
                res.status(404).send('Failed To Login.');
            else if (recordset.recordset.length == 0)
                res.status(404).send('Failed To Login. Email Or Password Are Incorrect.');
            else {
                var result = Object.assign({}, recordset.recordset[0]);
                delete result.Password;
                res.send(result)
            }

        });
    });
});

app.post('/sign-up', function (req, res) {
    sql.connect(config, function (err) {
        if (err) {
            console.log(err);
        }
        var request = new sql.Request();
        request.input('password', sql.VarChar, req.body.password);
        request.input('email', sql.VarChar, req.body.email);
        request.input('name', sql.VarChar, req.body.name);
        request.query(`IF NOT EXISTS (SELECT * FROM Users WHERE [email] = @email)
                    INSERT INTO Users (password, email, name) VALUES (@password,@email,@name)
                    ELSE THROW 51000, 'User With The Same Email Already exists.', 1;` , function (err, recordset) {
            if (err) {
                res.status(404).send('User With The Same Email Already Exists.');
            }
            else if (recordset.rowsAffected.length == 1) {
                console.log('created user, email:' + req.body.email);
                res.send(true);
            }

        });
    });
});

app.listen(PORT, function () {
    console.log('Server is running on PORT:', PORT);
});