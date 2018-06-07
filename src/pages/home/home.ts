import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavigationDetailsPage } from '../navigation-details/navigation-details';




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

  constructor(public navCtrl: NavController, private httpClient: HttpClient, private fb: FormBuilder, menu: MenuController) {
    this.myGroup = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
    menu.enable(true);

  }

  addItem() {
    console.log(this.myGroup.valid);
    if (!this.myGroup.valid) {

    } else {

      return new Promise(resolve => {
        const url = 'http://localhost:1323/sevens'
        let body = new FormData();
        body.append('name', this.myGroup.get('name').value);
        body.append('price', this.myGroup.get('price').value);
        body.append('submitDate', String(new Date()))
        this.httpClient.post(url, body).subscribe(data => {
          console.log(data);
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
      const url = 'http://localhost:1323/sevens'
      this.httpClient.get(url).subscribe((data: Array<any>) => {
        this.isCheckListItem = true;
        this.ItemList = data;
        console.log(data[0]);

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


}

