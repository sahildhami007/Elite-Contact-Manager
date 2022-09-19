import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.dp();
    this.loggedIn();
  }

  // for dp, if availabe
  dp() {
    return localStorage.getItem('photo');
  }

  // for signin/signout button preview
  loggedIn() {
    const pic = this.dp()
    console.log(pic);

    return localStorage.getItem('token');
  }

  // global sigh out
  logout() {
    this.api.signOut();
  }
}
