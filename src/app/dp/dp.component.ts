import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dp',
  templateUrl: './dp.component.html',
  styleUrls: ['./dp.component.css']
})
export class DpComponent implements OnInit {

  @Output() dp: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    let photoUrl = localStorage.getItem("photoUrl");
    this.dp.emit(photoUrl+ "ffffffffffffffffffffffffffffffffffffffffffffff")
  }

}
