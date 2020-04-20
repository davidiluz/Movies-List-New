import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user';

export enum UserActionTypes {
    LogIn = '[User] Login',
    LogInSuccess = '[User] Login Success',
    LogInFail = '[User] Login Fail',
    LogOut = '[User] LogOut',
    SignUp = '[User] SignUp',
    SignUpSuccess = '[User] SignUp Success',
    SignUpFail = '[User] SignUp Fail',
    ResetError = '[User] Reset Error'
}

export class LogIn implements Action {
    readonly type = UserActionTypes.LogIn;
    constructor(public payload: any) { }
}

export class LogInSuccess implements Action {
    readonly type = UserActionTypes.LogInSuccess;
    constructor(public payload: User) { }
}

export class LogInFail implements Action {
    readonly type = UserActionTypes.LogInFail;
    constructor(public payload: any) { }
}

export class LogOut implements Action {
    readonly type = UserActionTypes.LogOut;
}

export class SignUp implements Action {
    readonly type = UserActionTypes.SignUp;
    constructor(public payload: any) { }
}

export class SignUpSuccess implements Action {
    readonly type = UserActionTypes.SignUpSuccess;
}

export class SignUpFail implements Action {
    readonly type = UserActionTypes.SignUpFail;
    constructor(public payload: any) { }
}

export class ResetError implements Action {
    readonly type = UserActionTypes.ResetError;
}

export type UserActions =
    LogOut | ResetError |
    LogIn | LogInSuccess | LogInFail |
    SignUp | SignUpSuccess | SignUpFail;