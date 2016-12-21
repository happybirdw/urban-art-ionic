import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Endpoints } from './endpoints';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoriesService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CategoriesService {
  data: any;
  constructor(public http: Http, private endpoints: Endpoints) {
    console.log('Hello CategoriesService Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.endpoints.getCategories())
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log("cagegories:", this.data);
          resolve(this.data);
        });
    });
  }

/*  post(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.endpoints.postCategory(), data)
        .map(res => res.json())
        .subscribe(err => {
           console.log(err);
           if(err){
              reject(err);
           }else{
              resolve()
           }
          
        });
    });
  }
*/

}
