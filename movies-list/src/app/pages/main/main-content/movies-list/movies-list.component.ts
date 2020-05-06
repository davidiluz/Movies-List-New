import { Component,Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent {
  @Input() movies:Movie[];
  @Input() selectedMovie:Movie;
  @Output() edit = new EventEmitter<number>();
  
  editMovie(id:number){
    this.edit.emit(id);
  }



}
