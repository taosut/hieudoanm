import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../app.state';
import { signOut } from '../store/actions';
import { StorageService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private storageService: StorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.storageService.getCookie('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      this.setAuthentication();
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }

  private setAuthentication(): void {
    this.storageService.setCookie('isAuthenticated', 'false');
    this.storageService.setCookie('token', '');
    this.store.dispatch(signOut({ token: '', isAuthenticated: false }));
  }
}
