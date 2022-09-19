import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  tokenHardValue =
    'eyJhbGciOiJIUzI1NiIsIUl9.eyJzdWIiOiJiYXNlV2ViQXBpU3ViamVjdCIsImp0aSI6IjYyYmVhNWQxLTQyNzAtNGE8';
  passwordIsValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public api: ApiService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/),
        Validators.minLength(3),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]), // ('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[A-Za-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&](?=.*\d)[A-Za-z\d!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{5,}$/
        ),
      ]),
    });
  }

  signUp() {
    this.http
      .post<any>('http://localhost:3000/signup', this.signupForm.value)
      .subscribe(
        (res) => {
          console.log(this.signupForm.value);
          this.signupForm.reset();
          localStorage.setItem('token', JSON.stringify(this.tokenHardValue));
          this.router.navigate(['/home']);
        },
        (err) => {
          alert('Please resister yourself again.');
        }
      );
  }

  passwordValid(event: any) {
    this.passwordIsValid = event;
  }
}
