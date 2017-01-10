import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Endpoints } from './endpoints'
import 'rxjs/add/operator/map';

/*
  Generated class for the Works provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WorksService {
  data: any;

  constructor(public http: Http, private endpoints: Endpoints) {
   
    console.log('Hello Works Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.endpoints.works())
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log("works:", this.data);
          resolve(this.data);
        });
    });
  }

  post(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.endpoints.works(), data)
        .map(res => res.json())
        .subscribe(err => {
          console.log(err);
          if (err) {
            reject(err);
          } else {
            resolve()
          }

        });
    });
  }


  getImagesPath() {
    return this.endpoints.API_PATH + "/img/";
    /*return "";*/
  }

  uploadImage(imgData, imgName) {
    return new Promise((resolve, reject) => {
      console.log("Works service - uploadImage() to " + this.endpoints.images())
      this.http.post(this.endpoints.images(), { imgData: imgData, imgName: imgName })
        //.map(res => res.json())
        .subscribe(err => {
          console.log(err);
          if (err) {
            reject(err);
          } else {
            resolve()
          }
        });
    });
  }

  getWorkById(id) {
    let selected = null;
    this.data.map((work) => {
      if (work.id == id) selected = work; console.log("1er selected", selected); return selected;
    })
    console.log("2eme selected", selected);
    return selected
  }

}
