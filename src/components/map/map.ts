import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from '../../providers/auth';
import { WorksService } from '../../providers/works.service';
import { Routes } from '../../app/app.routes';


declare var google;
/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  template: "<div id='map_canvas'></div>"
})
export class Map {

  map: any;
  lat: number; // = 46.2043907;
  long: number; //  = 6.143157699999961;
  items: any = [];

  constructor(public navCtrl: NavController, private worksService: WorksService, private auth: Auth) {
    this.lat = auth.lat;
    this.long = auth.long;
  }
  // map styles
  styles = [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "gamma": 0.5
        }
      ]
    }
  ];

  init(zoom: number = 14) {

    //console.log("initPosition", this.lat, this.long);
    this.map = new google.maps.Map(document.getElementById("map_canvas"), {
      center: new google.maps.LatLng(this.lat, this.long),
      zoom: zoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.map.setOptions({ styles: this.styles });

    // Current position marker with infoWindow
    var marker = new google.maps.Marker({
      position: { lat: this.lat, lng: this.long },
      map: this.map,
      icon: '../../assets/icon/Me.png',
      title: 'Where I am'
    });
    var infowindow = new google.maps.InfoWindow({
      content: '<b>' + marker.title + '</b>',
      size: new google.maps.Size(150, 50)
    });
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(this.map, marker);
    });

    // Create all markers from the dataBase Works
    this.worksService.load().then((data) => {

      this.items = data;
      this.setMarkers(this.map);
    })

  }

  setMarkers(map) {
    // Adds markers to the map.
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
      coords: [1, 1, 20, 20],
      type: 'rect'
    };

    // Construct a new InfoWindow.
    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < this.items.length; i++) {
      var work = this.items[i];
/*      var image = {

        url: this.worksService.getImagesPath() + work._id + '-' + work.photos[0] + '.jpeg',
        // This marker is 20 pixels wide by 20 pixels high.
        size: new google.maps.Size(20, 20),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 20)
      };
*/
      let marker = new google.maps.Marker({
        position: { lat: work.pos[1], lng: work.pos[0] },
        map: map,
        icon: '../../assets/icon/work.png',
        shape: shape,
        title: work.title
      })

      marker["work"] = work;

      const self = this;

      google.maps.event.addListener(marker, 'click', function () {

        infoWindow.close();
        infoWindow.setContent(this.work.title);
        infoWindow.open(map,this);

        self.navCtrl.push(Routes.getPage(Routes.WORK), { item: this.work });
      })




    } // end build markers

    

  }




}
