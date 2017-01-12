import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { Auth } from '../../providers/auth';
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
  lat: number;
  long: number;
  isFavorite: boolean = false;

  testCheckboxOpen: boolean;
  testCheckboxResult;

  constructor(
              public navCtrl: NavController, 
              private params: NavParams, 
              private worksService: WorksService, 
              private auth: Auth,
              public alertCtrl: AlertController) {
    this.imagesPath = this.worksService.getImagesPath();
    this.selectedWork = params.data.item;
    this.lat = auth.lat;
    this.long = auth.long;
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

  slidesOptions:Object={
    pager: true,
    //autoHeight: true
  };


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
    directionsDisplay.setOptions( { suppressMarkers: true } );
    
    directionsService.route({
      origin: {lat: this.lat, lng: this.long}, // current position
      destination: {lat: this.selectedWork.pos[1], lng: this.selectedWork.pos[0]}, // work position
      travelMode: google.maps.TravelMode.WALKING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        // Display the duration:
        document.getElementById('duration').innerHTML = 
          response.routes[0].legs[0].duration.text;

        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  toggleFavorite() {
    return this.isFavorite = !this.isFavorite;
  }

  chooseShareWay(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Share with?');

    alert.addInput({
      type: 'checkbox',
      label: 'Facebook',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Tweet',
      value: 'value2'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Whatsapp',
      value: 'value3'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;
      }
    });
    alert.present();
    
  }

}
