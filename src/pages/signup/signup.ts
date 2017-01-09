import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import {Auth} from '../../providers/auth';
import { Routes } from '../../app/app.routes';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  email:string;
  password:string;
  error:string;

  constructor(private navCtrl: NavController,public viewCtrl: ViewController, private auth:Auth) {}

  signup(){
   this.auth.signup({email:this.email,password:this.password })
     .then((success)=>{
       this.goTabs();
     },(error)=>{
       this.error = error._body;
     });
 }

  goTabs(){
    this.navCtrl.push(Routes.getPage(Routes.TABS));
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
