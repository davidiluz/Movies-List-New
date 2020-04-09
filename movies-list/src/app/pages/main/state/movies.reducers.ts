import * as fromRoot from '../../../state/app.state';
import { movie } from 'src/app/models/movie';
import { MoviesActions, MoviesActionTypes } from './movies.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface MoviesState {
    currentMovie: movie | null;
    movies: movie[];
}

export const initialState: MoviesState = {
    currentMovie: null,
    movies: [],
};

export interface State extends fromRoot.State {
    movies: MoviesState
}


export function reducer(state: MoviesState = initialState, action: MoviesActions): MoviesState {
    switch (action.type) {
        case MoviesActionTypes.SelectMovie: {
            return {
                ...state,
                currentMovie: action.payload
            };
        }
        default: {
            return state;
        }
    }
}

const getMoviesFeatureState = createFeatureSelector<MoviesState>('movies');

export const getSelectedMovie = createSelector(
    getMoviesFeatureState,
    state => state.currentMovie
)