import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavigationDetailsPage } from '../navigation-details/navigation-details';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  openNavDetailsPage() {
    this.navCtrl.push(HomePage);
  }

  getItemlist() {
    return new Promise(resolve => {
      const url = 'http://localhost:1323/authen'
      let body = new FormData();
      body.append('username', this.loginForm.get('username').value);
      body.append('password', this.loginForm.get('password').value);
      this.httpClient.post(url,body).subscribe(data => {
        console.log(data);
        this.openNavDetailsPage();
      }, err => {
        console.log(err.error['message']);
      });
    });
  }


}
