import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LogOut } from 'src/app/pages/login/state/user.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new LogOut());
    this.router.navigate(['/login']);
  }

}
