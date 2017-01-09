import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import {Auth} from '../../providers/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  slidesOptions:Object={
    pager:true,
  };

  constructor(public navCtrl: NavController, private auth:Auth) {
    if(!this.auth.isInit){
      this.auth.init()
        .then((token)=>{
          this.navCtrl.setRoot(Routes.getRootPage(token!=null));
        });
    };
  }

  goLogin(){
    this.navCtrl.push(Routes.getPage(Routes.LOGIN))
  }

}
