import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FriendModel } from '../shared/model';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css'],
})
export class FriendComponent {
  formValue!: FormGroup;
  friendModelObj: FriendModel = new FriendModel();
  public friendData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  ImagePath = 'assets/1.jpg';
  selectedFile!: File;
  imagePreview!: any;
  demoUrl = 'http://localhost:4200/';

  constructor(
    private http: HttpClient,
    public formbuilder: FormBuilder,
    public api: ApiService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullname: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactno1: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      country: ['', Validators.required],
      //file: ['']//, Validators.required]
    });
    this.getAllFriends();
  }

  clickAddFriend() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postFriend() {
    this.friendModelObj.fullname = this.formValue.value.fullname;
    this.friendModelObj.department = this.formValue.value.department;
    this.friendModelObj.email = this.formValue.value.email;
    this.friendModelObj.contactno = this.formValue.value.contactno1;
    this.friendModelObj.country = this.formValue.value.country;
    // this.friendModelObj.imagePath = this.formValue.value.file;

    this.api.postFrnd(this.friendModelObj).subscribe(
      (res) => {
        console.log(res);
        let ref = document.getElementById('cancel'); //var "ref" is used to close the model after model after one member is added
        ref?.click();
        this.formValue.reset();
        this.getAllFriends();
      },
      (err) => {
        alert('Post again.');
        window.location.reload();
      }
    );
  }

  getAllFriends() {
    this.api.getFrnd().subscribe((res) => {
      this.friendData = res;
    });
  }

  onEditClick(row: any) {
    console.log(row);
    this.showAdd = false;
    this.showUpdate = true;
    this.friendModelObj.id = row.id;

    this.formValue.controls['fullname'].setValue(row.fullname);
    this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contactno1'].setValue(row.contactno);
    this.formValue.controls['country'].setValue(row.country);
    // this.formValue.controls['file'].setValue(row.file);
  }

  updateFriend() {
    this.friendModelObj.fullname = this.formValue.value.fullname;
    this.friendModelObj.department = this.formValue.value.department;
    this.friendModelObj.email = this.formValue.value.email;
    this.friendModelObj.contactno = this.formValue.value.contactno1;
    this.friendModelObj.country = this.formValue.value.country;
    // this.friendModelObj.imagePath = this.formValue.value.file;

    this.api.updateFrnd(this.friendModelObj, this.friendModelObj.id).subscribe(
      (res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllFriends();
      },
      (err) => {
        alert('error while updating!!');
      }
    );
  }

  deleteFriend(row: any) {
    console.log(row);
    if (confirm('Are you sure you want to delete this record?')) {
      this.api.deleteFrnd(row.id).subscribe(
        (res) => {
          this.getAllFriends();
        },
        (err) => {
          alert('Error while deleting record.');
        }
      );
    }
  }

  onProfileClick(row: any) {
    console.log(row);
    this.formValue.controls['fullname'].setValue(row.fullname);
    this.formValue.controls['department'].setValue(row.department);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['contactno1'].setValue(row.contactno);
    this.formValue.controls['country'].setValue(row.country);
    // this.formValue.controls['file'].setValue(row.file);
  }
}
