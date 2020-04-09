import { Injectable } from '@angular/core';
//import usersData from 
import { User } from '../models/user';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, observable, Subject } from 'rxjs';
import usersData from 'src/assets/usersData.json';
@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {

    }
    public LogIn(email: string, password: string): Observable<User> {
        var subject = new Subject<User>();
        this.http.get('../../assets/usersData.json')
            .subscribe((data) => {
                let xxx = data["users"].find(user => user.email == email && user.password == password);
                let newUser = new User();
                if (xxx) {
                    newUser.id = xxx.id;
                    newUser.email = xxx.email;
                    newUser.name = xxx.name;
                    return subject.next(newUser);
                }
                else
                    return subject.next(null);
            });
        return subject.asObservable();
    }

    public IsPasswordValid(password: FormControl): { [s: string]: boolean } {
        if (password) {
            let ascii = password.value.split('').map(t => t.charCodeAt(0))
            if (!ascii.find(t => t >= 65 && t <= 90)) {
                return { 'validPassword': true };
            }
            else
                return null;
        }
        else
            return { 'validPassword': true };
    }

    public SignUp(newUser: any): number {
        let isUserExists: boolean;
        debugger;
        isUserExists = usersData["users"].find(t => t.email == newUser.email) ? true : false;
        if (isUserExists)
            return -1;
        else {
            //change json file;
            const newId : number = usersData["users"].length + 1;
            newUser.id = newId;

            this.http.post('src/assets/usersData.json',newUser).subscribe( t=>{
                debugger;
                console.log(usersData);
                this.http.get('../../assets/usersData.json')
                .subscribe((data) => {
                    console.log(data)
                })
            },e=>{debugger; console.log(e)});
            return newId;
        }

    }


}

