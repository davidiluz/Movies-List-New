import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { MainComponent } from './main.component';

import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MoviesListComponent } from './main-content/movies-list/movies-list.component';
import { EditMovieComponent } from './main-content/edit-movie/edit-movie.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


import { StoreModule } from '@ngrx/store';
import { reducer } from './state/movies.reducers';
import { EffectsModule } from '@ngrx/effects';
import { MoviesEffects } from './state/movies.effects';
import { MoviesService } from './movies.service';




@NgModule({
  declarations: [MainComponent, AboutComponent, MenuComponent, MainContentComponent, MoviesListComponent, EditMovieComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MainRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forFeature('movies', reducer),
    EffectsModule.forFeature([MoviesEffects])
  ],
  providers:[MoviesService]
})
export class MainModule { }
