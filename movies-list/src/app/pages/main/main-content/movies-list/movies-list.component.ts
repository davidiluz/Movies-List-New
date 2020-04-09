import { Component, OnInit, Input } from '@angular/core';
import { movie } from 'src/app/models/movie';
import { Store } from '@ngrx/store';
import { MoviesState } from '../../state/movies.reducers';
import { SelectMovie } from '../../state/movies.actions';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(private store:Store<MoviesState>) { }

  ngOnInit(): void {
  }
  selectedMovieName:string = "";
  @Input() moviesList:movie[];

  editMovie(movie:movie){
    this.selectedMovieName = movie.name;
    this.store.dispatch(new SelectMovie(movie));
  }
}
