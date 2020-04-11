import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MoviesState, getSelectedMovie } from '../../state/movies.reducers';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  movie: Movie = new Movie();
  hideEditMovie: boolean = true;
  allowEdit:boolean = false;
  constructor(private store: Store<MoviesState>) { }

  ngOnInit(): void {
    this.store.select(getSelectedMovie).subscribe(
      selectedMovie => {
        if (this.hideEditMovie && selectedMovie != null) {
          this.hideEditMovie = false;
          if(selectedMovie.creationUser){
            
          }
        }
        Object.assign(this.movie, selectedMovie)
      });
  }

  // form: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required]),
  //   year: new FormControl('', []),
  //   rating: new FormControl('', []),
  //   description: new FormControl('', []),
  //   director: new FormControl('', []),
  //   cast: new FormControl('', []),
  // });

  submit() {

  }

}
