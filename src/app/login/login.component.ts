import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginUser!: SocialUser | any;
  loginStatus: boolean = false;
  invalidCredientials: boolean = false;
  data: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private authService: SocialAuthService
  ) {
    localStorage.clear()
  }

  ngOnInit(): void {
    // user login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // external login method
    this.authService.authState.subscribe((loginUser) => {
      if (loginUser.provider === 'FACEBOOK') {

        FB.getLoginStatus((response: any) => {
          console.log("accessToken is:-- " + response.authResponse.accessToken);
          if (response.status == 'connected') {
            FB.api(
              'https://graph.facebook.com/v15.0/101894136037442?fields=posts%7Bmessage%2Ccreated_time%2Cfull_picture%7D&access_token=EAAFzHiBLhKIBAHuGqXSIBwBw10QqdCcyxhbTZAihHSZBpmrVOq24qTPPCUdECsbjyszxBmPkUuV27aAM6pi8RTWDxTCj8b4AqZCGYoYGWeaTLwpfb190Ry6PJOZAz4GNcsgYuemkz7eG3HCZAdWNNtIWt5RLRbHVbbnr7dndCWVzzwiTCxIxp'
              , (response: any) => {
                console.log("page_token is:-- " + response.page_token);
                // if you face any issue while logged in with fb then plz update FB.api url, update get cmd in fb developer site
                // copy getcode>curl and conver in node.js from https://onlinedevtools.in/curl, paste only the api url at 45.
                this.data = response.posts.data;
                console.log(this.data);
                // console.log(this.data[0].actions[0].link);

                // console.log(this.data?.likes);
              }
            );
          } else { return; }
        });

        this.loginUser = loginUser;
        this.router.navigate(["login"]).then(() => {
          // location.replace("https://localhost:4200/home");
        });

        this.loginStatus = (loginUser != null);
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        localStorage.setItem('auth', JSON.stringify(loginUser));
      }

      if (loginUser.provider === 'GOOGLE') {
        this.loginUser = loginUser;
        this.router.navigate(["home"]).then(() => {
          location.replace("https://localhost:4200/home");
        });

        this.loginStatus = (loginUser != null);
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        localStorage.setItem('auth', JSON.stringify(loginUser));
      }

    }, (err) => {
      console.log(err);
    })
  }

  // facebook signin popup
  facebook(): void {
    this.api.facebookHandle()
  }
  // user signin method
  login() {
    this.http.get<any>('http://localhost:3000/signup').subscribe((res) => {
      this.loginUser = res.find((find: any) => {
        return (find.email === this.loginForm.value.email
          && find.password === this.loginForm.value.password);
      });

      if (this.loginUser) {
        this.router.navigate(['/home']).then(() => {
          location.replace("https://localhost:4200/home");
        });
        this.loginStatus = (this.loginUser != null);
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        localStorage.setItem('user_auth', JSON.stringify(this.loginUser));
        this.loginForm.reset();
      } else {
        this.loginStatus = false;
        this.invalidCredientials = true;
        console.log('err: Wrong credentials entered, If credentials are right then start JSON SERVER with this cmd: json-server --watch db.json');
      }
    }, (err) => {
      console.log("user err: " + err);
    })
  }

}
// https://www.youtube.com/watch?v=G5HPBdZgcx8
