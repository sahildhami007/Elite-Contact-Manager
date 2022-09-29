import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  authData: any;
  userData: any;
  photoUrl: any;
  dateTime!: Date;
  userName: any;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('auth');
    const user_storage = localStorage.getItem('user_auth');

    if (storage) {
      this.authData = JSON.parse(storage);
    } else if (user_storage) {
      this.userData = JSON.parse(user_storage);
    } else {
      this.logout();
    }

    timer(0, 1000).subscribe(() => {
      this.dateTime = new Date()
    })

  }

  loggedIn() {
    if (this.authData) {
      this.photoUrl = this.authData.photoUrl;
      this.userName = this.authData.name
    } if (this.userData) {
      this.photoUrl = 'assets/2.jpg';
      this.userName = this.userData.name
    }
    return localStorage.getItem('loginStatus');
  }

  logout() {
    if (localStorage.getItem('auth')) {
      this.api.signOut();
    }
    console.log("Logout");
    this.router.navigate(['login']).then();
    return localStorage.clear();

  }

}
