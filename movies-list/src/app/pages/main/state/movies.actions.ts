import { Movie } from 'src/app/models/movie';
import { Action } from '@ngrx/store';

export enum MoviesActionTypes{
    Load = '[Movies] Load',
    SuccessfullLoad = '[Movies] Load Succeeded',
    FailedLoad = '[Movies] Load Failed',
    SelectMovie = '[Movies] Select',
    EditMovie = '[Movies] Edit Movie',
    DeleteMovie = '[Movies] Delete Movie',
    AddMovie = '[Movies] Add Movie'
}

export class SelectMovie implements Action {
    readonly type = MoviesActionTypes.SelectMovie;
    constructor(public payload: Movie) { }
}

export type MoviesActions = SelectMovie;