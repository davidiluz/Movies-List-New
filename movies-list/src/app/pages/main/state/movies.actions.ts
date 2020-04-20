import { Movie } from 'src/app/models/movie';
import { Action } from '@ngrx/store';

export enum MoviesActionTypes {
    SelectMovie = '[Movies] Select',
    InitializeNewMovie = '[Movies] Initialize New Movie',

    Load = '[Movies] Load',
    LoadSuccess = '[Movies] Load Success',
    LoadFail = '[Movies] Load Fail',

    AddOrUpdateMovie = '[Movies] AddOrUpdate',
    AddOrUpdateMovieSuccess = '[Movies] AddOrUpdate Success',
    AddOrUpdateMovieFail = '[Movies] AddOrUpdate Fail',

    DeleteMovie = '[Movies] Delete',
    DeleteMovieSuccess = '[Movies] Delete Success',
    DeleteMovieFail = '[Movies] Delete Fail',
}

export class InitializeNewMovie implements Action{
    readonly type = MoviesActionTypes.InitializeNewMovie;
}

export class SelectMovie implements Action {
    readonly type = MoviesActionTypes.SelectMovie;
    constructor(public payload: number) { }
}

export class Load implements Action {
    readonly type = MoviesActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = MoviesActionTypes.LoadSuccess;
    constructor(public payload: Movie[]) { }
}

export class LoadFail implements Action {
    readonly type = MoviesActionTypes.LoadFail;
    constructor(public payload: string) { }
}


export class AddOrUpdateMovie implements Action {
    readonly type = MoviesActionTypes.AddOrUpdateMovie;
    constructor(public payload: Movie) { }
}

export class AddOrUpdateMovieSuccess implements Action {
    readonly type = MoviesActionTypes.AddOrUpdateMovieSuccess;
    constructor(public payload: Movie) { }
}

export class AddOrUpdateMovieFail implements Action {
    readonly type = MoviesActionTypes.AddOrUpdateMovieFail;
    constructor(public payload: string) { }
}

export class DeleteMovie implements Action {
    readonly type = MoviesActionTypes.DeleteMovie;
    constructor(public payload: number) { }
}

export class DeleteMovieSuccess implements Action {
    readonly type = MoviesActionTypes.DeleteMovieSuccess;
    constructor(public payload: number) { }
}

export class DeleteMovieFail implements Action {
    readonly type = MoviesActionTypes.DeleteMovieFail;
    constructor(public payload:string) { }
}

export type MoviesActions =
    SelectMovie | InitializeNewMovie|
    Load | LoadFail | LoadSuccess |
    AddOrUpdateMovie | AddOrUpdateMovieFail | AddOrUpdateMovieSuccess |
    DeleteMovie | DeleteMovieFail | DeleteMovieSuccess;