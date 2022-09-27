import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  // styleUrls: ['./xyz.component.css']
})
export class XyzComponent implements OnInit {

  pic: any;

  constructor() { }

  ngOnInit(): void {

  }

}
