import { Component, OnInit } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  photoUrl: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void { }

  parentfunc(data: any) {
    console.log(data);

    // this.photoUrl = data;
    // console.log(this.photoUrl);
  }

  // for signin/signout button preview
  loggedIn() {
    return localStorage.getItem('token');
  }

  // global sigh out
  logout() {
    this.api.signOut();
  }
}
