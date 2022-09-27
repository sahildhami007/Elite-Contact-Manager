import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginUser!: SocialUser | any;
  idToken = '1096116863490-snd9d0jjr0hlhbq8dlsi2d5i1kfp7lrc.apps.googleusercontent.com';
  loginStatus: boolean = false;
  invalidCredientials: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private authService: SocialAuthService) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.googleService();

  }

  googleService() {
    this.authService.authState.subscribe((loginUser) => {
      if (loginUser) {
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
        this.loginStatus = true;
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        localStorage.setItem('google_auth', JSON.stringify(loginUser));
        console.log("google login");

      } else {
        this.loginStatus = false;
      }
    }, err => {
      console.log("google err: " + err);
    });
  }

  // facebook signin
  facebook() {
    alert("Sorry!  Having some issues with Facebook login. You can either use Google login or Sigh Up method.")
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((loginUser) => {
    //   if (loginUser) {
    //     this.loginStatus = true;
    //     localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
    //     localStorage.setItem('facebook_auth', JSON.stringify(loginUser));
    //     console.log("fb login");
    //     this.router.navigate(['/home']).then( ()=>{
    //       location.reload();
    //     });
    //   } else {
    //     this.loginStatus = false;
    //   }
    // }, (err) => {
    //   console.log("fb err: " + err);
    // })
  }

  // user signin
  login() {
    this.http.get<any>('http://localhost:3000/signup').subscribe((res) => {

      this.loginUser = res.find((a: any) => {
        return (a.email === this.loginForm.value.email
          && a.password === this.loginForm.value.password);
      });

      if (this.loginUser) {
        this.router.navigate(['/home']).then(() => {
          location.reload();
        });
        this.loginStatus = true;
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        localStorage.setItem('user_auth', JSON.stringify(this.loginUser));
        console.log("user login");
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
