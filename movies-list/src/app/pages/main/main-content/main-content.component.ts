import { Component, OnInit } from '@angular/core';
import { movie } from 'src/app/models/movie';
import { Store } from '@ngrx/store';
import { MoviesState } from '../state/movies.reducers';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
  //showEditMovie:boolean = false;
  constructor(private store:Store<MoviesState>) { }

  ngOnInit(): void {
    //this.store.select(get)
  }

  moviesList: movie[] = [{position:1,name:'Harry Potter',year:'2000',description:'Good!',rating:8},
                         {position:2,name:'Ultras',year:'2020',description:'football fans',rating:6},
                         {position:3,name:'The Popes',year:'2018',description:'popes',rating:7}];

}
