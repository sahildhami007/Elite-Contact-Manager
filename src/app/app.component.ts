import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  googleData: any;
  userData: any;
  photoUrl: any;

  constructor(private api: ApiService, private router : Router ) { }

  ngOnInit(): void {
    const google_storage = localStorage.getItem('google_auth');
    const user_storage = localStorage.getItem('user_auth');

    if (google_storage){
      this.googleData = JSON.parse(google_storage);
    } else if (user_storage){
      this.userData = JSON.parse(user_storage);
    } else {
      // this.api.signOut();
      this.signOut();
    }
   }

   signOut(): void {
    localStorage.clear();
    this.router.navigate(['login']).then();
   }

  // for signin/signout button preview
  loggedIn() {
    // this.photoUrl = userData.photoUrl
    return localStorage.getItem('loginStatus');
  }

  // global sigh out
  logout() {
    this.api.signOut();
  }
}
