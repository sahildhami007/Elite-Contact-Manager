//https://www.youtube.com/watch?v=G5HPBdZgcx8
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService) { }

  // auth_signout
  signOut(): void {
    this.authService.signOut();
  }

  // post user
  postFrnd(data: any) {
    return this.http.post<any>(this.apiUrl + 'friends/', data);
  }

  // get user
  getFrnd() {
    return this.http.get<any>(this.apiUrl + 'friends');
  }

  // update user
  updateFrnd(data: any, id: number) {
    return this.http.put<any>(this.apiUrl + 'friends/' + id, data);
  }

  // delete user
  deleteFrnd(id: number) {
    return this.http.delete<any>(this.apiUrl + 'friends/' + id);
  }

  // all signup users
  getAllSignUps() {
    return this.http.get<any>(this.apiUrl + 'signup');
  }

}
