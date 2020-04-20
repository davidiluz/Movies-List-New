import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class LoginService {
    constructor(private http: HttpClient, private router: Router) {}

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    public LogIn(email: string, password: string): Observable<User> {
        return this.http.get('http://localhost:3000/login/' + email + '/' + password)
            .pipe(
                map(user => ({
                    name: user["Name"],
                    email: user["Email"],
                    id: user["Id"],
                    moviesILiked: user["MoviesILiked"],
                }) as User),
                catchError(err => {
                    //console.error(err)
                    return throwError(err);
                })
            )
    }

    public SignUp(name: string, email: string, password: string): Observable<any> {
        var body = {
            'name': name, 'email': email, 'password': password
        };
        return this.http.post('http://localhost:3000/sign-up', JSON.stringify(body), this.httpOptions)
            .pipe(
                catchError(err => {
                    console.error(err)
                    return throwError(err.error);
                })
            )
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
}

