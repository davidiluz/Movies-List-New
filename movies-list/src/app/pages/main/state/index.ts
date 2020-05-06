import * as fromRoot from '../../../state/app.state';
import { Movie } from 'src/app/models/movie';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MoviesState } from './movies.reducers';

export interface State extends fromRoot.State {
    movies: MoviesState
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