import { Component } from '@angular/core';

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

  items: any = []
  constructor(private worksService: WorksService) {
       
  }

  map: any;
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

  init(lat:number, long:number, work:any, zoom:number=18) {

    this.map = new google.maps.Map(document.getElementById("map_canvas1"), {
          center: new google.maps.LatLng(lat, long),
          zoom: zoom,
          //mapTypeId: google.maps.MapTypeId.ROADMAP
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          heading: 90,
          tilt: 45
     });

     this.map.setOptions({styles: this.styles});

     console.log(this.map);
      this.worksService.load().then((data)=>{

        console.log("this.items =",data)
        this.items = data;
        this.setMarkers(this.map, work);
      })  
     
  }

  rotate90() {
    var heading = this.map.getHeading() || 0;
    this.map.setHeading(heading + 90);
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

      var image = {
        
        url: this.worksService.getImagesPath() + work._id + '-' + work.photos[0] + '.jpeg',
        // This marker is 20 pixels wide by 20 pixels high.
        size: new google.maps.Size(20, 20),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 20)
      };
      console.log("creating marker",work)

      var marker = new google.maps.Marker({
        position: {lat: work.pos[1], lng: work.pos[0]},
        map: map,
        icon: image,
        shape: shape,
        title: work.title,
        zIndex: work[3]
      });
  }

}
