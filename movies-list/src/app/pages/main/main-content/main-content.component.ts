import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Store } from '@ngrx/store';
import { MoviesState } from '../state/movies.reducers';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
  constructor(private store: Store<MoviesState>) { }

  ngOnInit(): void {
  }

  moviesList: Movie[] = [];

}
