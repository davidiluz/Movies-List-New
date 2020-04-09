import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionTypes {
    LogIn = '[User] Login',
    LogOut = '[User] LogOut',
    SignUp = '[User] SignUp'
}

export class LogIn implements Action {
    readonly type = UserActionTypes.LogIn;
    constructor(public payload: User) { }
}

export class LogOut implements Action {
    readonly type = UserActionTypes.LogOut;
}

export class SignUp implements Action {
    readonly type = UserActionTypes.SignUp;
    constructor(public payload: User) { }
}


export type UserActions = LogIn | LogOut | SignUp;