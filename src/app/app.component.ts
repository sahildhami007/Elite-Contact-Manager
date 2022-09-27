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
  googleData: any;
  userData: any;
  photoUrl: any;
  dateTime!: Date;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    const google_storage = localStorage.getItem('google_auth');
    const user_storage = localStorage.getItem('user_auth');

    if (google_storage) {
      this.googleData = JSON.parse(google_storage);
    } else if (user_storage) {
      this.userData = JSON.parse(user_storage);
    } else {
      this.logout();
    }

    timer(0, 1000).subscribe( ()=>{
      this.dateTime = new Date()
    })

  }


  loggedIn() {
    if(this.googleData){ this.photoUrl = this.googleData.photoUrl }
    if (this.userData){ this.photoUrl = 'assets/2.jpg'}
    return localStorage.getItem('loginStatus');
  }
  logout() {
    if (localStorage.getItem('user_auth')) {
      console.log('user logout');
      this.router.navigate(['login']).then();
      return localStorage.clear();
    } else {
      this.api.signOut();
    }
  }

}
