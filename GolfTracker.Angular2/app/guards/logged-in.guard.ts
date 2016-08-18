import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private _auth: AuthService) {}

  canActivate() {
    return this._auth.isLoggedIn();
  }
}