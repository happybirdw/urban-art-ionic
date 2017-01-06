import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { WorksService } from '../../providers/works.service';
import { Map } from '../../components/map/map';

/*
  Generated class for the Work page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-work',
  templateUrl: 'work.html'
})
export class WorkPage implements OnInit {

  @ViewChild(Map)
  private map: Map;

  selectedWork: any;
  imagesPath: string;
  title: string;
  constructor(public navCtrl: NavController, private params: NavParams, private worksService: WorksService) {
    this.imagesPath = this.worksService.getImagesPath();
    this.selectedWork = params.data.item;

  }

  ionViewDidLoad() {
    console.log('Hello WorkPage Page');
  }

/*  
  ionViewDidEnter(){
    const pos = this.selectedWork.pos;
    this.map.init(pos[1], pos[0])
  }
*/
  ngOnInit(){
    /*const pos = this.selectedWork.pos;
    this.map.init(pos[1], pos[0])*/
  }

  onClickBack() {
    this.navCtrl.pop();
  }

}
