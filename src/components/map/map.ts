import { Component } from '@angular/core';
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

  init(lat:number, long:number, zoom:number=12) {

    this.map = new google.maps.Map(document.getElementById("map_canvas"), {
          center: new google.maps.LatLng(lat, long),
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
     });
     console.log(this.map);
  }
}
