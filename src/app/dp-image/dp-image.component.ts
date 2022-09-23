import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dp-image',
  templateUrl: './dp-image.component.html',
  styleUrls: ['./dp-image.component.css']
})
export class DpImageComponent implements OnInit {
  photoUrl!: string | null;
  img!:string;

  constructor() { }

  image(){
    // this.img = JSON.stringify(localStorage.getItem('photoUrl'));
  }

  ngOnInit(): void {
    this.photoUrl = 'assets/1.jpg';
    this.image();
    }


}
