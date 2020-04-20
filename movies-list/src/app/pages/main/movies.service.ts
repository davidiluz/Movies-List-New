import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { tap, map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';



@Injectable()
export class MoviesService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    public loadMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>('http://localhost:3000/movies/getAll')
            .pipe(
                map(movies =>
                    movies.map(item => ({
                    id: item["Id"],
                    name: item["Name"],
                    year: item["Year"],
                    cast: item["Cast"],
                    director: item["Director"],
                    description: item["Description"],
                    awards: item["Awards"],
                    writers: item["Writers"],
                    creationUser: item["CreationUser"],
                    lastUpdateDate: item["LastUpdateDate"],
                }) as Movie)),
                catchError((err)=> {
                    console.log(err);
                    return EMPTY;
                })
            );
    }

    public AddOrUpdateMovie(movie: Movie) {
        return this.http.post<Movie>('http://localhost:3000/movies/addOrUpdate', JSON.stringify(movie), this.httpOptions)
            .pipe(
                map(item => ({
                        id: item["Id"],
                        name: item["Name"],
                        year: item["Year"],
                        cast: item["Cast"],
                        director: item["Director"],
                        description: item["Description"],
                        awards: item["Awards"],
                        writers: item["Writers"],
                        creationUser: item["CreationUser"],
                        lastUpdateDate: item["LastUpdateDate"]
                    }) as Movie)
            );
    }

    public DeleteMovie(movieId:number){
        return this.http.post('http://localhost:3000/movies/deleteMovie',{id:movieId},this.httpOptions)
        .pipe(
            catchError(err => throwError(err))
        )
    }
}