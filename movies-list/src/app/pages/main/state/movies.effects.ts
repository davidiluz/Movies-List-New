import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as moviesActions from './movies.actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from '../movies.service';
import { of } from 'rxjs';

@Injectable()
export class MoviesEffects {
    constructor(private actions$: Actions, private moviesService: MoviesService) {

    }

    @Effect()
    loadMovies$ = this.actions$.pipe(
        ofType(moviesActions.MoviesActionTypes.Load),
        mergeMap((action: moviesActions.Load) =>
            this.moviesService.loadMovies()
                .pipe(
                    map((movies: Movie[]) => (new moviesActions.LoadSuccess(movies))),
                    catchError(err => of(new moviesActions.LoadFail(err.error)))               )
        ));

    @Effect()
    addOrUpdateMovie$ = this.actions$.pipe(
        ofType(moviesActions.MoviesActionTypes.AddOrUpdateMovie),
        mergeMap((action: moviesActions.AddOrUpdateMovie) =>
            this.moviesService.AddOrUpdateMovie(action.payload)
                .pipe(
                    map((movie: Movie) => (new moviesActions.AddOrUpdateMovieSuccess(movie))),
                    catchError(err => of(new moviesActions.AddOrUpdateMovieFail(err.error)))
                )
        ));

    @Effect()
    deleteMovie$ = this.actions$.pipe(
        ofType(moviesActions.MoviesActionTypes.DeleteMovie),
        mergeMap((action: moviesActions.DeleteMovie) =>
            this.moviesService.DeleteMovie(action.payload).
                pipe(
                    map((deletedId: number) => new moviesActions.DeleteMovieSuccess(deletedId)),
                    catchError(err => of(new moviesActions.DeleteMovieFail(err.error)))
                ))
    )
} 