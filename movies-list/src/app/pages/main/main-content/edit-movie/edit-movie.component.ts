import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesState, getSelectedMovie } from '../../state/movies.reducers';
import { movie } from 'src/app/models/movie';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie:movie = null;
  constructor(private store:Store<MoviesState>) { }

  ngOnInit(): void {
    this.store.select(getSelectedMovie).subscribe(
      selectedMovie => this.movie = selectedMovie)
  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  submit(){
    
  }

}
