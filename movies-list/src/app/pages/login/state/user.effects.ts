import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoginService } from 'src/app/services/login.service';
import * as userActions from './user.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EMPTY, of } from 'rxjs';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions,
        private loginService: LoginService,
        private router: Router,
    ) { }

    @Effect()
    logIn$ = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LogIn),
        mergeMap((action: userActions.LogIn) =>
            this.loginService.LogIn(action.payload.email, action.payload.password)
                .pipe(
                    map((user: User) => (new userActions.LogInSuccess(user))),
                    tap(() => this.router.navigate([''])),
                    catchError(err => {
                        console.error('LOG IN FAIL :' + err);
                        return of(new userActions.LogInFail(err.error));
                    }
                    ))
        ))

    @Effect()
    signUp$ = this.actions$.pipe(
        ofType(userActions.UserActionTypes.SignUp),
        mergeMap((action: userActions.SignUp) =>
            this.loginService.SignUp(action.payload.name, action.payload.email, action.payload.password)
                .pipe(
                    map((result) => {
                        if (result == true) {
                            return new userActions.SignUpSuccess();
                        }
                        return new userActions.LogInFail('For Some Reason Sign Up Failed')
                    }),
                    tap(() => this.router.navigate([''])),
                    catchError(err => {
                        console.error('LOG IN FAIL :' + err);
                        return of(new userActions.SignUpFail(err));
                    }),

                )
        ))

}