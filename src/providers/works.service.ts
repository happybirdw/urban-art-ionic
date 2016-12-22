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
      this.http.get(this.endpoints.getWorks())
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
      this.http.post(this.endpoints.postWork(), data)
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
    return this.endpoints.API_PATH;
    /*return "";*/
  }

  uploadImage(imgData, imgName) {
    return new Promise((resolve, reject) => {
      console.log("Works service - uploadImage() to " + this.endpoints.postImage())
      this.http.post(this.endpoints.postImage(), { imgData: imgData, imgName: imgName })
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

}
