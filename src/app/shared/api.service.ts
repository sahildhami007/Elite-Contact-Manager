//https://www.youtube.com/watch?v=G5HPBdZgcx8
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiUrl = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService) { }

  refreshAuthToken(): void {
    this.authService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID);
  }
  getAccessToken(): void {
    this.authService.getAccessToken(FacebookLoginProvider.PROVIDER_ID);
  }
  refreshAccessToken(): void {
    this.authService.refreshAccessToken(FacebookLoginProvider.PROVIDER_ID);
  }




  // auth_signout
  signOut(): void {
    this.authService.signOut();
  }
  // facebook popup
  facebookHandle(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
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
