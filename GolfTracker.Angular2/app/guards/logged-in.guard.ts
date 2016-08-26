import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this._auth.isLoggedIn();
    if (this._auth.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this._auth.redirectUrl = state.url;

    // Navigate to the login page
    this._router.navigate(['/login']);
    return false;
  }
}