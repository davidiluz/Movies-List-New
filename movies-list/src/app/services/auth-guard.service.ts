import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { getIsUserLoggedIn } from '../pages/login/state/user.reducers';
import { State } from '../state/app.state';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<State>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return true;
        var isLoggedIn: boolean;
        this.store.select(getIsUserLoggedIn).subscribe(t => isLoggedIn = t);
        if (state.url == '/login' || state.url == '/sign-up') {
            if (isLoggedIn)
                return false;
            else
                return true;
        }
        else {
            if (isLoggedIn)
                return true;
            else {
                return this.router.parseUrl('/login');
            }
        }

    }

}


