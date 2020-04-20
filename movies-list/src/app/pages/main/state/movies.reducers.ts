import * as fromRoot from '../../../state/app.state';
import { Movie } from 'src/app/models/movie';
import { MoviesActions, MoviesActionTypes, InitializeNewMovie } from './movies.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { error } from '@angular/compiler/src/util';

export interface MoviesState {
    currentMovieId: number | null;
    movies: Movie[];
    error:string;
}

export const initialState: MoviesState = {
    currentMovieId: null,
    movies: [],
    error:'',
};

export interface State extends fromRoot.State {
    movies: MoviesState
}


export function reducer(state: MoviesState = initialState, action: MoviesActions): MoviesState {
    switch (action.type) {
        case MoviesActionTypes.SelectMovie: {
            return {
                ...state,
                currentMovieId: action.payload,
                error:'',
            };
        }

        case MoviesActionTypes.InitializeNewMovie:{
            return{
                ...state,
                currentMovieId:-1
            }
        }

        case MoviesActionTypes.LoadSuccess: {
            return {
                ...state,
                movies: action.payload,
                error:'',
            };
        }

        case MoviesActionTypes.AddOrUpdateMovieSuccess: {
            var updatedMovies;
            var isUpdate = state.movies.find(t=>t.id == action.payload.id);
            if(isUpdate){
                updatedMovies = state.movies.map(t=>
                    action.payload.id == t.id ? action.payload : t)
            }
            else
                updatedMovies = state.movies.concat([action.payload])
            
            return {
                ...state,
                movies: updatedMovies,
                currentMovieId: action.payload.id
            };
        }

        case MoviesActionTypes.DeleteMovieSuccess: {
            const updatedMovies = state.movies.filter(t => t.id != action.payload)
            return {
                ...state,
                movies: updatedMovies,
                currentMovieId:null,
                error:'',
            };
        }
        
        case MoviesActionTypes.AddOrUpdateMovieFail:
        case MoviesActionTypes.LoadFail: 
        case MoviesActionTypes.DeleteMovieFail: {
            return {
                ...state,
                error:action.payload
            };
        }

        default: {
            return state;
        }
    }
}

const getMoviesFeatureState = createFeatureSelector<MoviesState>('movies');

export const getSelectedMovieId = createSelector(
    getMoviesFeatureState,
    state => state.currentMovieId
)

export const getSelectedMovie = createSelector(
    getMoviesFeatureState,
    getSelectedMovieId,
    (state, selectedId) => {
        if(selectedId == -1){
            let newMovie = new Movie()
            newMovie.id = -1
            return newMovie;
        }
        else
            return selectedId ? state.movies.find(t => t.id == selectedId) : null;
    }
)

export const getMovies = createSelector(
    getMoviesFeatureState,
    state => state.movies
)