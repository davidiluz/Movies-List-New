import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MoviesState } from '../state/movies.reducers';
import { getSelectedMovie, getMovies } from '../state';
import * as moviesActions from '../state/movies.actions';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent implements OnInit {

  constructor(private store: Store<MoviesState>) { }
  moviesList$: Observable<Movie[]>;
  selectedMovie$: Observable<Movie>;

  ngOnInit(): void {
    this.moviesList$ = this.store.pipe(select(getMovies));
    this.selectedMovie$ = this.store.pipe(select(getSelectedMovie));
  }

  editMovie(movieId: number) {
    this.store.dispatch(new moviesActions.SelectMovie(movieId));
  }

  saveChanges(movie: Movie) {
    this.store.dispatch(new moviesActions.AddOrUpdateMovie(movie));
  }

  deleteMovie(movieId: number) {
    this.store.dispatch(new moviesActions.DeleteMovie(movieId));
  }

}
