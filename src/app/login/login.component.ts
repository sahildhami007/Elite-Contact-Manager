import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  user: any;
  tokenHardValue = '1096116863490-snd9d0jjr0hlhbq8dlsi2d5i1kfp7lrc.apps.googleusercontent.com';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.googleBreaker();
  }

  googleBreaker() {
    this.authService.authState.subscribe((userData) => {
      localStorage.setItem('token', JSON.stringify(userData.idToken));
      localStorage.setItem('photo', JSON.stringify(userData.photoUrl));
      this.router.navigate(['/home']);
      console.log("google login");
    }, err => {
      console.log("google ERROR-- " + err);
    });
  }

  // google signin
  google() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  }

  // facebook signin
  facebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
      console.log(this.user);
      console.log("facebook login");
    }, (err) => {
      console.log("fb ERROR-- " + err);
    })
  }

  // user signin
  login() {
    this.http.get<any>('http://localhost:3000/signup').subscribe((res) => {
      this.user = res.find((a: any) => {
        return (a.email === this.loginForm.value.email
          && a.password === this.loginForm.value.password);
      });
      if (this.user) {
        localStorage.setItem('token', JSON.stringify(this.tokenHardValue));
        this.router.navigate(['/home']);
        console.log("user login");
      } else {
        this.user = true;
        console.log('wrong credientials entered');
        console.log('start JSON SERVER with this cmd: json-server --watch db.json');
      }
    });
  }


}


// https://www.youtube.com/watch?v=G5HPBdZgcx8
