import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { State } from 'src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { SignUp } from '../state/user.actions';
import { getUserError } from '../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage$: Observable<string>;
  constructor(private store: Store<State>, private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(select(getUserError));
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),//, this.loginService.IsPasswordValid]),
  });

  submit() {
    let name = this.form.get('name').value;
    let email = this.form.get('email').value;
    let password = this.form.get('password').value;
    this.store.dispatch(new SignUp({ name: name, email: email, password: password }));
  }

}
