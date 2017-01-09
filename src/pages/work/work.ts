import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { WorksService } from '../../providers/works.service';
import { Map1 } from '../../components/map1/map';

/*
  Generated class for the Work page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-work',
  templateUrl: 'work.html'
})
export class WorkPage { //implements OnInit {

  @ViewChild(Map1)
  private map: Map1;

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
  ngOnInit(){
    const pos = this.selectedWork.pos;
    this.map.init(pos[1], pos[0])
  }
*/
  ionViewDidEnter(){
    const pos = this.selectedWork.pos;
    this.map.init(pos[1], pos[0], this.selectedWork)
    
  }

  onClickBack() {
    this.navCtrl.pop();
  }

  go() {
    //API : https://developers.google.com/maps/documentation/javascript/directions
    //EXample : https://developers.google.com/maps/documentation/javascript/examples/directions-simple
    /*navigator.geolocation.getCurrentPosition(position => {
      console.log("getPosition", position);
    })*/
  }

}
