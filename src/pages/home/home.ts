import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myGroup : FormGroup;
  nameItem: Object[];
  isCheckListItem:boolean;
  constructor(public navCtrl: NavController,private httpClient:HttpClient) {
    this.myGroup = new FormGroup({
      name: new FormControl(),
      price: new FormControl()
   });    
  }

  addItem() {
   
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'my-auth-token'
    //   })
    // };
    return new Promise(resolve => {
      const url = 'http://localhost:1323/sevens'
      let body = new FormData();
      body.append('name',this.myGroup.get('name').value);
      body.append('price',this.myGroup.get('price').value);
      this.httpClient.post(url,body).subscribe(data => {
        // resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  clear() {
    this.myGroup.get('name').setValue('');
    this.myGroup.get('price').setValue('');
    this.isCheckListItem = false;

  }
  
  getItemlist(){
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
}
