import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducers';


@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    StoreModule.forFeature('user',reducer)
  ],
  providers:[LoginService]
})
export class LoginModule { }
