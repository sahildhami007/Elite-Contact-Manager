import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor() { }

  canActivate() {
    if (localStorage.getItem('loginStatus')) {
      return true;
    }
    else {
      alert("You have to Login to access this page.");
      return false;
    }
  }
}

