import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { Endpoints } from './endpoints'
import 'rxjs/add/operator/map';

/*
  Generated class for the users provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersService {
  data: any;
  contentHeader: Headers = new Headers({"Content-Type": "application/json"});

  constructor(public http: Http, private endpoints: Endpoints) {
   
    console.log('Hello Users Provider');
  }

  login(data) {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.endpoints.users())
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log("users:", this.data);
          resolve(this.data);
        });
    });
  }

  signup(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.endpoints.users(), data)
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

}
