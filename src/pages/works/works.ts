import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {WorksService} from '../../providers/works.service';

/*
  Generated class for the Works page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-works',
  templateUrl: 'works.html'
})
export class WorksPage {

  items:any = []
  constructor(public navCtrl: NavController, private worksService: WorksService) {
      this.worksService.load().then((data)=>{
        this.items = data;
      })    
  }

  ionViewDidLoad() {
    console.log('Hello WorksPage Page');
  }

}
