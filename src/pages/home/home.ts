import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavigationDetailsPage } from '../navigation-details/navigation-details';
import { LoginPage } from '../login/login';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myGroup: FormGroup;
  nameItem: Object[];
  ItemList = [];
  isCheckListItem: boolean;
  isCheckDeleteUpdate: boolean;
  sum: number;
  item;
  CreateDateTimeArrays = [];
  CreateDate;

  constructor(public navCtrl: NavController, private httpClient: HttpClient, private fb: FormBuilder, menu: MenuController, params: NavParams) {
    this.myGroup = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    menu.enable(true);
    this.item = params.data.item;

  }

  addItem() {

    if (!this.myGroup.valid) {

    } else {

      return new Promise(resolve => {
        const url = 'http://localhost:1323/sevens'
        let body = new FormData();
        body.append('name', this.myGroup.get('name').value);
        body.append('price', this.myGroup.get('price').value);
        body.append('createdatetime',String(new Date()))
        body.append('createby', this.item['username'])
        this.httpClient.post(url, body).subscribe(data => {
          this.ItemList.push(data);
          this.sumNumber;
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
      const url = 'http://localhost:1323/itemlist'
      let body = new FormData()
      body.append("createby", this.item['username'])
      this.httpClient.post(url, body).subscribe((data: Array<any>) => {
        this.isCheckListItem = true;
        for (let i = 0; i< data.length; i++){
          this.CreateDate = new Date(data[i].createdatetime).getDate()+"/"+new Date(data[i].createdatetime).getMonth()+"/"+new Date(data[i].createdatetime).getFullYear();
        this.ItemList.push({"id":data[i].id,"name" :data[i].name,"price" :data[i].price,"createDate" :this.CreateDate});  
      }
      console.log(this.ItemList);
      
        this.sum = 0;
        for (let i = 0; i < this.ItemList.length; i++) {
          this.sum += Number(this.ItemList[i].price);

        }
        console.log(this.sum);
      }, err => {
        console.log(err);
      });
    });
  }

  deleteItem(id: string, index: number) {
    console.log(id);

    return new Promise(resolve => {
      const url = 'http://localhost:1323/sevens/' + id
      this.httpClient.delete(url).subscribe(data => {
        console.log(data);
        this.ItemList.splice(index, 1)
      }, err => {
        console.log(err);
      });
    });
  }

  get sumNumber(): number {
    return this.sum
  }
  openNavDetailsPage(item) {
    this.navCtrl.push(NavigationDetailsPage, { item: item });
  }

  logout(){
    this.navCtrl.push(LoginPage);
  }
}
