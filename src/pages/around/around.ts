import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Map} from '../../components/map/map';

/*
  Generated class for the Around page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-around',
  templateUrl: 'around.html'
})
export class AroundPage implements OnInit {

  @ViewChild(Map)
  private map: Map;

  constructor() {}

  ngOnInit(){
    this.map.init(46.2043907, 6.143157699999961)
  }

}
