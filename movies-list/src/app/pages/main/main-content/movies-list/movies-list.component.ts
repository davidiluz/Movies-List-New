import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Store } from '@ngrx/store';
import { MoviesState, getSelectedMovie } from '../../state/movies.reducers';
import { SelectMovie } from '../../state/movies.actions';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private store: Store<MoviesState>) { }
  selectedMovieName: string = "";
  ngOnInit(): void {
    this.store.select(getSelectedMovie).subscribe(selectedMovie => {
      if(selectedMovie)
      this.selectedMovieName = selectedMovie.name;
    })
  }

  @Input() moviesList: Movie[];

  editMovie(movie: Movie) {
    //this.selectedMovieName = movie.name;
    this.store.dispatch(new SelectMovie(movie));
  }
}
