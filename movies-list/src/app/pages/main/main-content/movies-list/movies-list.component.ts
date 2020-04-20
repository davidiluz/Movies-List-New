import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Store, select } from '@ngrx/store';
import { MoviesState, getSelectedMovie, getMovies } from '../../state/movies.reducers';
import { SelectMovie } from '../../state/movies.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private store: Store<MoviesState>) { }
  moviesList$: Observable<Movie[]>;
  selectedMovie$: Observable<Movie>;
  ngOnInit(): void {
    this.selectedMovie$ = this.store.pipe(select(getSelectedMovie));
    this.moviesList$ = this.store.pipe(select(getMovies));
  }

  editMovie(movieId: number) {
      this.store.dispatch(new SelectMovie(movieId));
  }

}
