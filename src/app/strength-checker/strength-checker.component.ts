import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter, OnInit } from '@angular/core';
@Component({
  selector: 'app-strength-checker',
  templateUrl: './strength-checker.component.html',
  styleUrls: ['./strength-checker.component.css']
})
export class StrengthCheckerComponent implements OnChanges {

  constructor() { }

  @Input() public passwordToVerify!: string;
  @Input() public barLabel = "string";
  @Output() passwordStrength = new EventEmitter<boolean>();

  bar0!: string;
  bar1!: string;
  bar2!: string;
  bar3!: string;
  bar4!: string;
  msg = '';

  private static checkStrength(p: any | []) {
    let force = 0;
    const regex = /(?=.*[!@#$%&*])/g;    //const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);    //const lowerLetters = /[a-z]{2}/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    // short password

    force = p.length <= 1 ? Math.min(force, 10) : force;
    // poor variety of characters
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;
    force = passedMatches === 4 ? Math.min(force, 40) : force;
    force = passedMatches === 5 ? Math.min(force, 50) : force;
    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (this.msg === "Poor") {
      this.bar0 = '#ab190c'; this.bar1 = '#DDD'; this.bar2 = '#DDD'; this.bar3 = '#DDD';
    } else if (this.msg === "Average") {
      this.bar0 = '#c1c412'; this.bar1 = '#c1c412'; this.bar2 = '#DDD'; this.bar3 = '#DDD';
    } else if (this.msg === "Good") {
      this.bar0 = '#94eb31'; this.bar1 = '#94eb31'; this.bar2 = '#94eb31'; this.bar3 = '#DDD';
    } else if (this.msg === "Strong") {
      this.bar0 = '#22ad0c'; this.bar1 = '#22ad0c'; this.bar2 = '#22ad0c'; this.bar3 = '#22ad0c';
    }

    const password = changes['passwordToVerify'].currentValue;
    //this.setBarColors(4, '#DDD');
    if (password) {
      const c = this.getColor(StrengthCheckerComponent.checkStrength(password));
      //this.setBarColors(c.idx, c.col);
      const pwdStrength = StrengthCheckerComponent.checkStrength(password);
      pwdStrength === 50 ? this.passwordStrength.emit(true) : this.passwordStrength.emit(false);
      switch (c.idx) {
        case 1:
          this.msg = 'Poor';
          break;
        case 2:
          this.msg = 'Average';
          break;
        case 3:
          this.msg = 'Good';
          break;
        case 4:
          this.msg = 'Strong';
          break;
      }
    } else {
      this.msg = '';
    }
  }

  private getColor(s: number) {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
    } else if (s <= 30) {
      idx = 2;
    } else if (s <= 40) {
      idx = 3;
    } else if (s <= 50) {
      idx = 4;
    }
    return {
      idx: idx + 1,
      //col: this.colors[idx],
    };
  }

  private setBarColors(count: number, col: string[]) {
    for (let n = 0; n < count; n++) {
      col = ['bar' + n];
    }
  }

}
