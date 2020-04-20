import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MoviesState, getSelectedMovie } from '../../state/movies.reducers';
import { Movie } from 'src/app/models/movie';
import { takeWhile } from 'rxjs/operators';
import { MoviesService } from '../../movies.service';
import * as moviesActions from '../../state/movies.actions';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit, OnDestroy {
  movie: Movie = new Movie();
  isActive = true;
  hideEditMovie: boolean = true;
  allowEdit: boolean = true;
  constructor(private store: Store<MoviesState>, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.store.pipe(select(getSelectedMovie), takeWhile(() => this.isActive)).subscribe(
      selectedMovie => {
        if (selectedMovie != null && selectedMovie.id) {
          this.hideEditMovie = false;
          if (selectedMovie.creationUser) {

          }
          this.movie = Object.assign({}, selectedMovie);
        }
        else
          this.hideEditMovie = true;

      })
  };

  saveChanges() {
    this.store.dispatch(new moviesActions.AddOrUpdateMovie(this.movie));
  }

  cancelChanges() {
    this.store.dispatch(new moviesActions.SelectMovie(this.movie.id));
  }

  deleteMovie() {
    this.store.dispatch(new moviesActions.DeleteMovie(this.movie.id));
  }
  ngOnDestroy() {
    this.isActive = false
  }
}
