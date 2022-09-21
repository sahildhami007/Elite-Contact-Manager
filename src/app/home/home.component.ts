import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allUsers: any;
  loginStatus: any;
  show = '0';
  currentValue = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.signUpView();
  }

  // view all sighup users
  signUpView() {
    this.api.getAllSignUps().subscribe((res) => {
      this.allUsers = res;
      this.loginStatus = localStorage.getItem('loginStatus');
    });
  }

  // CALCULATOR code begins from here
  get firstkey(): string {
    return this.show[0];
  }
  get lastkey(): string {
    return this.show[this.show.length - 1];
  }

  pressNum(val: string) {
    if (this.firstkey == '0') {
      this.currentValue = '';
      console.log('Current Value: ' + this.currentValue);
    }
    this.currentValue += val;
    this.show = this.currentValue;
    console.log('Current Value: ' + this.currentValue);
  }

  pressOpr(val: string) {
    if (
      this.lastkey === '/' ||
      this.lastkey === '*' ||
      this.lastkey === '-' ||
      this.lastkey === '+'
    ) {
      //    /97.9.7+1
      console.log('already hit the operator');
      return;
    } else if (this.lastkey === '.') {
      console.log('already hit the Dot button');
      return;
    }
    this.currentValue = this.currentValue + val;
    this.show = this.currentValue;
    console.log('Current Value: ' + this.currentValue);
  }

  getAnswer() {
    if (this.show == '' || this.show == '0' || this.show == '.') {
      this.show = '0';
      this.currentValue = '';
      console.log('Current Value: ' + this.currentValue);
      return;
    }
    if (
      this.firstkey === '/' ||
      (this.firstkey === '*' && this.lastkey === '+') ||
      this.lastkey === '-' ||
      this.lastkey === '/' ||
      this.lastkey === '*'
    ) {
      console.log('operators detect at both Beggining and End');
      // remove both operators
      this.currentValue = this.show.toString().slice(1, -1);
      if (this.currentValue !== '') {
        this.currentValue = eval(this.currentValue);
        this.show = this.currentValue;
        console.log('Current Value: ' + this.currentValue);
        return;
      }
      this.show = '0';
      this.currentValue = '';
      console.log('Current Value: ' + this.currentValue);
      return;
    }
    if (
      this.lastkey === '+' ||
      this.lastkey === '-' ||
      this.lastkey === '/' ||
      this.lastkey === '*'
    ) {
      console.log('operator detect at the end');
      this.currentValue = this.show.toString().slice(0, this.show.length - 1);
      console.log('operator removed');
      if (this.currentValue !== '') {
        this.currentValue = eval(this.currentValue);
        this.show = this.currentValue;
        console.log('Current Value: ' + this.currentValue);
        return;
      }
      this.show = '0';
      console.log('Current Value: ' + this.currentValue);
      return;
    }
    if (this.firstkey === '/' || this.firstkey === '*') {
      console.log('operator detect at the beginning');
      this.currentValue = this.show.toString().slice(1);
      console.log('operator removed');
      this.currentValue = eval(this.currentValue);
      this.show = this.currentValue;
      console.log('Current Value: ' + this.currentValue);
      return;
    }
    if (this.show == '' || this.show == '0' || this.show == '.') {
      this.show = '0';
      this.currentValue = '';
      console.log('Current Value: ' + this.currentValue);
      return;
    }

    try {
      if (this.currentValue == '') {
        this.show = '0';
        this.currentValue = '';
        return;
      }

      // Answer should be always in Integer type while using eval() method of java script
      this.show = eval(this.currentValue);
      this.currentValue = this.show;
    } catch (err) {
      if (err) {
        console.log('got an Error, Erasing all data');
        if (this.show == 'undefined') {
          this.show = 'NaN';
          this.currentValue = '';
          return;
        } else if (this.show == 'Infinity') {
          this.show = 'NaN';
          this.currentValue = '';
          return;
        } else if (this.show == 'NaN') {
          this.show = 'NaN';
          this.currentValue = '';
          return;
        }
        this.show = 'error';
        this.currentValue = '';
        return;
      }
    }

    if (
      this.currentValue == 'Infinity' ||
      this.currentValue == 'undefined' ||
      this.currentValue == 'NaN'
    ) {
      console.log('hit infinity,undefined,NaN');
      this.currentValue = '';
      this.show = '0';
    }
    if (this.currentValue == '0') {
      this.show = '0';
      this.currentValue = '';
    }
    console.log('Current Value: ' + this.currentValue);
  }

  clear() {
    if (this.show == '' || this.show == '0') {
      this.show = '0';
      this.currentValue = '';
    } else {
      this.currentValue = this.show
        .toString()
        .substring(0, this.show.toString().length - 1);
      this.show = this.currentValue;
      if (this.currentValue == '') {
        this.show = '0';
      }
    }
    console.log('Current Value: ' + this.currentValue);
  }

  allClear() {
    this.show = '0';
    this.currentValue = '';
    console.log('Current Value: ' + this.currentValue);
  }

}

//Calculator links-
//https://www.youtube.com/watch?v=HcoXpdRecro
//https://codingdiksha.com/angular-calculator-application-source-code/
