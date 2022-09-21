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
  loginUser!: SocialUser;
  idToken = '1096116863490-snd9d0jjr0hlhbq8dlsi2d5i1kfp7lrc.apps.googleusercontent.com';
  loginStatus!: boolean;
  invalidCredientials!: boolean;
  photoUrl!: string;

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
    this.authService.authState.subscribe((userData) => {
      if (userData) {
        this.loginStatus = true;
        this.photoUrl = userData.photoUrl;
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        localStorage.setItem('idToken', JSON.stringify(userData.idToken));
        localStorage.setItem('photoUrl', JSON.stringify(userData.photoUrl));
        this.router.navigate(['/home']);
        console.log("google login");
        console.log("photoUrl: "+ this.photoUrl);
      } else {
        // this.authService.signOut();
        console.log('else google logout');
        console.log("else photoUrl: "+ this.photoUrl);
        return localStorage.clear();
      }
    }, err => {
      console.log("err: " + err);
    });
  }

  // facebook signin
  facebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    // .then((userData) => {
    //   this.loginUser = userData;
    //   console.log(this.loginUser);
    //   console.log("facebook login");
    // }, (err) => {
    //   console.log("fb ERROR-- " + err);
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
        this.loginStatus = true;
        localStorage.setItem('loginStatus', JSON.stringify(this.loginStatus));
        // localStorage.setItem('idToken', JSON.stringify(this.idToken));
        this.router.navigate(['/home']);
        console.log("user login");
      } else if (!this.loginUser) {
        this.invalidCredientials = true;
        console.log('err: Wrong credentials entered, If credentials are right then start JSON SERVER with this cmd: json-server --watch db.json');
      }
    });
  }


}
// https://www.youtube.com/watch?v=G5HPBdZgcx8
