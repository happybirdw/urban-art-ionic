import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Endpoints} from './endpoints'
import 'rxjs/add/operator/map';

/*
  Generated class for the Works provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorksService {
  data: any;
  imagesPath: string = "assets/images/works/";
  
  constructor(public http: Http, private endpoints: Endpoints) {
    console.log('Hello Works Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.endpoints.getWorks())
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data);
          resolve(this.data);
        });
    });
  }

  post(data) {

  }

  
  getImagesPath() {
    return this.imagesPath;
  }
}
