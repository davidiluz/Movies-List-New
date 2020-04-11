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

  moviesList: Movie[] = [{ name: 'Harry Potter', year: '2000', description: 'Good!', rating: 8, director: 'david iluz', cast: 'abc def,rst uvw' },
  { name: 'Ultras', year: '2020', description: 'football fans', rating: 6, director: 'shira iluz', cast: 'abc def,rst uvw' },
  { name: 'The Popes', year: '2018', description: 'popes', rating: 7, director: 'zion iluz', cast: 'abc def,rst uvw' },
  ];

}
