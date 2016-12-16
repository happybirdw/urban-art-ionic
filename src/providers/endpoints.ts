
import { Injectable } from '@angular/core';

@Injectable()
export class Endpoints {

  API_PATH: string = "http://localhost:8000";

/*  getLogin(){
    return this.API_PATH + "/sessions/create";
  }

  getSignup(){
    return this.API_PATH + "/users";
  }*/

  getWorks(){
      return this.API_PATH + "/works"
  }

  postWork(){
      return this.API_PATH + "/works"
  }
}
  