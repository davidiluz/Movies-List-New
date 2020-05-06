import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { takeWhile } from 'rxjs/operators';
import { MoviesService } from '../../movies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnChanges{

  movieForm: FormGroup;

  @Input() movie: Movie;
  @Input() allowEdit: boolean;
  @Output() deleteMovie = new EventEmitter();
  @Output() saveChanges = new EventEmitter();

  constructor(private fb: FormBuilder) { 
    this.movieForm = this.fb.group({
      'name': ['', [Validators.required]],
      'year': [''],
      'director': [''],
      'cast': [''],
      'writers': [''],
      'awards': [''],
      'description': [''],
    })
  }


  ngOnChanges(changes:SimpleChanges):void{
    if(changes.movie){
      this.displayMovie();
    }
  }

  displayMovie(){
    this.movieForm.reset();
    this.movieForm.patchValue(this.movie);
  }

  save() {
    this.saveChanges.emit({...this.movie,...this.movieForm.value} as Movie);
  }

  cancelChanges() {
    this.displayMovie();
  }

  delete() {
    this.deleteMovie.emit(this.movie.id);
    
  }

}
