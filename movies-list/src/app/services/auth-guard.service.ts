import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { getIsUserLoggedIn } from '../pages/login/state';
import { State } from '../state/app.state';
import { takeWhile } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate,OnDestroy {

    constructor(private store: Store<State>, private router: Router) { }
    isActive = true;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
        // var isLoggedIn: boolean;
        // this.store.pipe(select(getIsUserLoggedIn)).subscribe(t => isLoggedIn = t);
        // if (state.url == '/login' || state.url == '/sign-up') {
        //     if (isLoggedIn)
        //         return false;
        //     else
        //         return true;
        // }
        // else {
        //     if (isLoggedIn)
        //         return true;
        //     else {
        //         return this.router.parseUrl('/login');
        //     }
        // }

    }

    ngOnDestroy(){
    }

}


