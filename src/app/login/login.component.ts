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

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private authService: SocialAuthService) {
    localStorage.clear();
  }

  ngOnInit(): void {
    // user login form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // external login method
    this.authService.authState.subscribe((loginUser) => {
      if (loginUser.provider == 'FACEBOOK') {
        window.fbAsyncInit = function () {
          FB.init({
            appId: '408048204743842',
            cookie: true,
            xfbml: true,
            version: 'v15.0'
          });
          FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) { return; }
          js = d.createElement(s); js.id = id;
          // js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode?.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        FB.getLoginStatus(function (response: any) {
          console.log(response);
          if (response.status == 'connected') {
            alert("User Authorized")
          }
        });
      }

      this.loginUser = loginUser;
      this.router.navigate(["home"]).then(() => {
        location.replace("https://localhost:4200/home");
        // location.reload();
      });

      this.loginStatus = (loginUser != null);
      localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
      localStorage.setItem('auth', JSON.stringify(loginUser));
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
          location.reload();
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
