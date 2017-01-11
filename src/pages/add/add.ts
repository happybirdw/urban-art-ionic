import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Geolocation } from 'ionic-native';

import { Work } from '../../classes/work';
import { WorksService } from '../../providers/works.service';
import { CategoriesService } from '../../providers/categories.service';
import { ArtistsService } from '../../providers/artists.service';

declare var google: any;
declare var navigator: any;
/*
  Generated class for the Add page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})
export class AddPage {

  container: Work;
  categories: any;
  artists: any;
  index: number = 0; // index for saving pictures as imageName
  base64Image: any = []; // to display in add.html

  image64test = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCACAAIADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAUH/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AvgDJFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/9k=";


  constructor(public navCtrl: NavController,
              private workService: WorksService,
              private categoriesService: CategoriesService,
              private ArtistsService: ArtistsService,
              private toastCtrl: ToastController,
              private _ngZone: NgZone) 
  {
    this.container = new Work();
    console.log("this.container:", this.container);
    this.categoriesService.load().then((data) => {
      this.categories = data;
    })
    this.ArtistsService.load().then((data) => {
      this.artists = data;
    })
      /* Test load image for Navigator */
      //this.base64Image = "data:image/jpeg;base64," + this.image64test;
      //this.uploadImage(this.image64test);
      
  }

  ionViewDidLoad() {
    console.log('Hello AddPage Page');
    this.getPosition();
  }

  getPicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      //sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      targetHeight: 500
    }).then((imageData) => {
      /* code need to use smartphone camera */
      this.base64Image.push( "data:image/jpeg;base64," + imageData); // image to display in works.html
      this.uploadImage(imageData); // image save in server
    }, (error) => {
      console.log("error ", error);
      /* Test load image for Navigator */
      this._ngZone.run(() => {
        //this.base64Image = "data:image/jpeg;base64," + this.image64test;
        this.base64Image.push( "data:image/jpeg;base64," + this.image64test);
        this.uploadImage(this.image64test);
      })
    });
  }

  uploadImage(imageData) {

    console.log("add - uploadImage()");

    const imgName = this.container._id + "-" + ++this.index;
    this.workService.uploadImage(imageData, imgName);
    this.container.photos.push(this.index);
  }

  getPosition() {
    console.log("getPosition");
    navigator.geolocation.getCurrentPosition(position => {
      /* Geolocation.getCurrentPosition().then(position => { */
      console.log("getPosition", position);
      this.container.pos.push(position.coords.longitude);
      this.container.pos.push(position.coords.latitude);
      this.geocode();
      console.log("this.position", this.container.pos)
    })
  }

  geocode() {
    console.log("geocode()", this.container.pos);
    const latlng = { lat: this.container.pos[1], lng: this.container.pos[0] };
    console.log("latlng", latlng);
    const geocoder = new google.maps.Geocoder;
    geocoder.geocode({ 'location': latlng }, (results, status) => {
      this.container.address = results[1].formatted_address;
      console.log("address", this.container.address);
    })
  }

  save() {
    this.container.datePosted = new Date();
    this.workService.post(this.container).then(() => {
      console.log("success:", this.container)
      this.showToast('Your files were successfully saved');
    }, () => {
      this.showToast('Save failed!');
      console.log("save error:", this.container)
    });
  }

  showToast(msg) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
