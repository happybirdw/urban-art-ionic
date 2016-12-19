import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from 'ionic-native';
import {Geolocation} from 'ionic-native';

import { Work } from '../../classes/work'
import { WorksService } from '../../providers/works.service';
import { CategoriesService } from '../../providers/categories.service';

declare var google: any;
declare var navigator: any;
/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  container: Work;
  categories: any

  constructor(public navCtrl: NavController, private workService: WorksService, private categoriesService: CategoriesService) {
    this.container = new Work();
    console.log("this.container:",this.container);
    this.categoriesService.load().then((data)=>{
      this.categories = data;
      })  
  }

  ionViewDidLoad() {
    console.log('Hello AddPage Page');
    this.getPosition();    
  }

  getPicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500
    }).then((imageData) => {
      this.container.photos.push("data:image/jpeg;base64," + imageData);

    }, (error) => {
      console.log("error ",error)
    });
  }

  getPosition() {      
    console.log("getPosition");
    navigator.geolocation.getCurrentPosition( position => {
    /* Geolocation.getCurrentPosition().then(position => { */
        console.log("getPosition",position);
        this.container.pos.push( position.coords.longitude);
        this.container.pos.push( position.coords.latitude);
        this.geocode();
        console.log("this.position", this.container.pos)
      })
  }

  geocode() {
    console.log("geocode()", this.container.pos);
    const latlng = {lat: this.container.pos[1], lng: this.container.pos[0]};
    console.log("latlng", latlng);
    const geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latlng}, (results, status) => {
        this.container.address = results[1].formatted_address;
          console.log("address", this.container.address);
      })
  }

  save() {
     this.container.datePosted = new Date();
     this.workService.post(this.container).then(()=>{
       console.log("success")
     }, ()=>{
       console.log("save error")
     });
  }

}
