import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { WorksService } from '../../providers/works.service';
import { Routes} from '../..app/app.routes';

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

  imagesPath: string;
  items: any = []
  constructor(public navCtrl: NavController, private worksService: WorksService) {
      this.imagesPath = this.worksService.getImagesPath();
      this.worksService.load().then((data)=>{
        this.items = data;
      })    
  }

  ionViewDidLoad() {
    console.log('Hello WorksPage Page');
  }

/*  selectItem(id) {
    this.navCtrl.push(Routes.getPage(Routes.WORK),{id:id})
  }
*/
}
