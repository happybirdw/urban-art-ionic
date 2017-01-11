import { Component } from '@angular/core';

import { Auth } from '../../providers/auth';
import {WorksService} from '../../providers/works.service';

declare var google;
/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map1',
  template: "<div id='map_canvas1'></div>"
})
export class Map1 {

  map: any;
  lat: number;
  long: number;
  items: any = []
  constructor(private worksService: WorksService, private auth: Auth) {
    this.lat = auth.lat;
    this.long = auth.long;
  }

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

  init(lat:number, long:number, work:any, zoom:number=15) {

    this.map = new google.maps.Map(document.getElementById("map_canvas1"), {
          center: new google.maps.LatLng(lat, long),
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
     });

     this.map.setOptions({styles: this.styles});
      
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
      google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(this.map, marker);
            });

      this.worksService.load().then((data)=>{
        this.items = data;
        this.setMarkers(this.map, work);
      })  
     
  }

  setMarkers(map, work) {
    // Adds markers to the map.

    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
      coords: [1, 1, 20, 20],
      type: 'rect'
    };
/*
      var image = {
        
        // url: this.worksService.getImagesPath() + work._id + '-' + work.photos[0] + '.jpeg',
        url: '../../assets/icon/work.png',
        // This marker is 20 pixels wide by 20 pixels high.
        size: new google.maps.Size(20, 20),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 20)
      };
*/

      var marker = new google.maps.Marker({
        position: {lat: work.pos[1], lng: work.pos[0]},
        map: map,
        icon: '../../assets/icon/work.png',
        shape: shape,
        title: work.title,
      });
  }

}
