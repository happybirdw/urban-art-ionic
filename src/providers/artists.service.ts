import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Endpoints } from './endpoints';

/*
  Generated class for the ArtistsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ArtistsService {

  data: any;
  constructor(public http: Http, private endpoints: Endpoints) {
    console.log('Hello ArtistsService Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.endpoints.getArtists())
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log("artists: ", this.data);
          resolve(this.data);
        });
    });
  }

}
