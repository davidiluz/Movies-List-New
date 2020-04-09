import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/models/user';
import { State } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { SignUp } from '../state/user.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
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
export class SignUpComponent {

  constructor(private store:Store<State>, private router:Router,private loginService:LoginService) { }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), this.loginService.IsPasswordValid]),
  });
  newUser:User = new User();
  submit() {
    let name = this.form.get('name').value;
    let email = this.form.get('email').value;
    let password = this.form.get('password').value;
    const succesefullSignUp: number = this.loginService.SignUp({email:email,password:password});
    debugger;
    if(succesefullSignUp!=-1){
      this.newUser.email = email;
      debugger;
      this.newUser.name = name;
      this.newUser.id = succesefullSignUp;
      this.store.dispatch(new SignUp(this.newUser))
    }
      
      
  }

}
