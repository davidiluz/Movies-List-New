import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { MainComponent } from './main.component';

import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MoviesListComponent } from './main-content/movies-list/movies-list.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMovieComponent } from './main-content/edit-movie/edit-movie.component';
import { MatTableModule } from '@angular/material/table';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/movies.reducers';




@NgModule({
  declarations: [MainComponent, AboutComponent, MenuComponent, MainContentComponent, MoviesListComponent, EditMovieComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MainRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule,
    StoreModule.forFeature('movies', reducer)
  ]
})
export class MainModule { }
