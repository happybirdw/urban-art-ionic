import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { WorksService } from '../../providers/works.service';
import { Map1 } from '../../components/map1/map';

declare var google;
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
  lat: number = 46.2043907;
  long: number = 6.143157699999961;  

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
    console.log("go clicked");
    //API : https://developers.google.com/maps/documentation/javascript/directions
    //EXample : https://developers.google.com/maps/documentation/javascript/examples/directions-simple
    this.calculateAndDisplayRoute();

  }

  calculateAndDisplayRoute() {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    //directionsDisplay.setMap(this.map.init(this.selectedWork.pos[1], this.selectedWork.pos[0], this.selectedWork));
    directionsDisplay.setMap(this.map.map);

    directionsService.route({
      origin: {lat: this.lat, lng: this.long}, // current position
      destination: {lat: this.selectedWork.pos[1], lng: this.selectedWork.pos[0]}, // work position
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
