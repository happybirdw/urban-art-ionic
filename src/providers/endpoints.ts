
import { Injectable } from '@angular/core';

@Injectable()
export class Endpoints {

    //API_PATH: string = window.location.origin; // http://localhost:8000/
   //API_PATH: string = (window.location.origin.indexOf('heroku') >= 0) ? 'https://ionic-urban-art.herokuapp.com' : "http://localhost:8000"; 
   API_PATH: string = "https://ionic-urban-art.herokuapp.com";

  login(){
    return this.API_PATH + "/login";
  }

  signup(){
    return this.API_PATH + "/users";
  }

  works(){
      return this.API_PATH + "/works"
  }

  categories(){
      return this.API_PATH + "/categories"
  }
  artists(){
      return this.API_PATH + "/artists"
  }
/*  postCategory(){
      return this.API_PATH + "/category"
  }*/

  images() {
      return this.API_PATH + "/images"
  }
}
  