import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';

import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { LogIn, ResetError } from './state/user.actions';
import { State } from 'src/app/state/app.state';
import { getUserError } from './state';
import { Observable } from 'rxjs';

const IsPasswordValid = function (password: FormControl): { [s: string]: boolean } {
  if (password) {
    let ascii = password.value.split('').map(t => t.charCodeAt(0))
    if (!ascii.find(t => t >= 65 && t <= 90)) {
      return { 'validPassword': true };
    }
    else
      return null;
  }
  else
    return { 'validPassword': true };
}

const errors = {
  'required': "field is required.",
  'email': "your email address is invalid.",
  'minlength': "password must be at least 6 characters.",
  'validPassword': "password must contain at least 1 upper case letter.",
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./sign-up/sign-up.component.css']
})
export class LoginComponent {
  errorMessage$: Observable<string>;
  form: FormGroup;
  emailInvalid: string[];
  passwordInvalid: string[];
  constructor(private store: Store<State>,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(select(getUserError));
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), IsPasswordValid]),
    })

    const emailControl = this.form.get('email')
    emailControl.valueChanges.pipe().subscribe(() => {
      if (emailControl.dirty && emailControl.invalid)
        this.emailInvalid = this.setErrorMessage(emailControl.errors)
      else
        this.emailInvalid = [];
    });

    const passwordControl = this.form.get('password');
    passwordControl.valueChanges.pipe().subscribe(() => {
      if (passwordControl.dirty && passwordControl.invalid)
        this.passwordInvalid = this.setErrorMessage(passwordControl.errors)
      else
        this.passwordInvalid = []
    });

  }

  setErrorMessage(validationErrors: ValidationErrors): string[] {
    let error = [];
    let currentErrors = Object.keys(validationErrors);
    if(currentErrors.includes('required'))
      error.push(errors['required'])
    else{
      currentErrors.forEach(t => {
        if (errors[t])
          error.push(errors[t])
      })
    }

    return error;
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