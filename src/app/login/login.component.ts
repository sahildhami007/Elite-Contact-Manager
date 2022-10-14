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
  accessToken ='EAAFzHiBLhKIBAGJPIPK5ML1LD0JaWCaRb3b3gFlLcXzuAUPYQT8hzI8GZBDdzmw27fZCcvOk7lOMutDoFPZBOFkd5O1u2TgDX27mfr0W9DUCgh86tL89JOWE0ZAITvfHvZAVpELc6MTHfvGZBx1n8JylvTlLUlkWtTcs1dgMIdepptU99JAsSY';
  pageId = '101894136037442';

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
        FB.getLoginStatus((res: any) => {
          if (res.authResponse) {
            console.log(res.authResponse.accessToken);

            console.log('Welcome!  Fetching your information.... ');

            // you have to add manually access token value
            FB.api("/"+this.pageId+"?fields=posts{full_picture,created_time,message}&access_token="+this.accessToken, (res: any) => {
              console.log(res);
              this.data = res.posts.data;
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
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

  // like facebook post method
  like() {
    let postid = '101894136037442_101967406032904'  // first post's id
    // FB.api("/" + postid + "?like&access_token=" + this.accessToken, res => {
    // FB.api(`/${postid}?like&access_token=${this.accessToken}`, res => {
    FB.api(`/${postid}?like&access_token=${this.accessToken}`, res => {
      console.log(res);
    });
  }

  // unlike facebook post method
  unlike() {
    let postid = '101894136037442_101967406032904'  // first post's id
    FB.api("/" + postid + "?unlike&access_token=" + this.accessToken, res => {
      console.log(res);
    });
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
