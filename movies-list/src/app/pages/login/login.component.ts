import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../models/user';

import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { LogIn, ResetError } from './state/user.actions';
import { State } from 'src/app/state/app.state';
import { getUserError } from './state/user.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./sign-up/sign-up.component.css']
})
export class LoginComponent {
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>, private http: HttpClient, private router: Router, private loginService: LoginService) {

  }
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), this.loginService.IsPasswordValid]),
  });
  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(select(getUserError));
  }

  submit() {
    let email = this.form.get('email').value;
    let password = this.form.get('password').value;
    this.store.dispatch(new LogIn({ 'email': email, 'password': password }));
  }

  signUp() {
    this.store.dispatch(new ResetError());
    this.router.navigate(['/sign-up']);
  }

}