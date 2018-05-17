import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myGroup: FormGroup;
  nameItem: Object[];
  isCheckListItem: boolean;
  isCheckDeleteUpdate: boolean;
  constructor(public navCtrl: NavController, private httpClient: HttpClient) {
    this.myGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    });
  }

  addItem() {
    if (this.myGroup.valid) {
      return new Promise(resolve => {
        const url = 'http://localhost:1323/sevens'
        let body = new FormData();
        body.append('name', this.myGroup.get('name').value);
        body.append('price', this.myGroup.get('price').value);
        this.httpClient.post(url, body).subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
      });
    }
    this.myGroup.get('name').markAsTouched();
    this.myGroup.get('price').markAsTouched();

  }

  clear() {
    this.myGroup.get('name').setValue('');
    this.myGroup.get('price').setValue('');
    this.isCheckListItem = false;

  }

  getItemlist() {
    return new Promise(resolve => {
      const url = 'http://localhost:1323/sevens'
      this.httpClient.get(url).subscribe(data => {
        this.isCheckListItem = true;

        this.nameItem = [data];
        console.log(this.nameItem);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteItem(id: string) {
    return new Promise(resolve => {
      const url = 'http://localhost:1323/sevens/'
      this.httpClient.delete(url + id).subscribe(data => {
        this.isCheckListItem = false;
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
