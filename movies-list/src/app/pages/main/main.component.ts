import { Component, OnInit } from '@angular/core';
import { MoviesState } from './state/movies.reducers';
import { Store } from '@ngrx/store';
import { Load } from './state/movies.actions';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor(private store:Store<MoviesState>) { }

  ngOnInit(): void {
    this.store.dispatch(new Load());
  }

}
