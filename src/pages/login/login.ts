import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';



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

  item = [
    {
      title: "Welcome to the Docs!",
      description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
      image: "assets/imgs/ica-slidebox-img-1.png",
    },
    {
      title: "What is Ionic?",
      description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
      image: "assets/imgs/ica-slidebox-img-2.png",
    },
    {
      title: "What is Ionic Cloud?",
      description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
      image: "assets/imgs/ica-slidebox-img-3.png",
    }
  ];

  loginForm: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient, private fb: FormBuilder, private alertCtrl: AlertController) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



  openNavDetailsPage(item) {
    this.navCtrl.push(HomePage, { item: item });
  }

  getItemlist() {
    return new Promise(resolve => {
      const url = 'http://localhost:1323/authen'
      let body = new FormData();
      body.append('username', this.loginForm.get('username').value);
      body.append('password', this.loginForm.get('password').value);
      this.httpClient.post(url, body).subscribe(data => {
        console.log(data);
        this.openNavDetailsPage(data);
      }, err => {
        this.presentAlert(err.error['message'])
      });
    });
  }

  presentAlert(error: string) {
    let alert = this.alertCtrl.create({
      title: 'เข้าสู่ระบบไม่สำเร็จ',
      subTitle: 'กรุณาใส่ username และ password ให้ถูกต้อง',
      buttons: ['OK']
    });
    alert.present();
  }
}
