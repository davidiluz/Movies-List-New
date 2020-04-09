import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../models/user';

import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { LogIn } from './state/user.actions';
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  //styleUrls: ['./login.component.sass']
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }
      
      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginComponent {

  constructor(private store: Store<State>, private http: HttpClient, private router: Router, private loginService: LoginService) { }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), this.loginService.IsPasswordValid]),
  });

  user: User = new User();

  submit() {
    this.loginService.LogIn(this.form.get('email').value, this.form.get('password').value)
      .subscribe(user => {
        if (user) {
          this.store.dispatch(new LogIn(user));
          this.router.navigate(['']);
        }
      })
  }

  signUp() {
    this.router.navigate(['/sign-up']);
  }

}