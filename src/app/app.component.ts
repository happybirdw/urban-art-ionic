import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Routes } from './app.routes';

import { WorksService } from '../providers/works.service';
import { CategoriesService } from '../providers/categories.service';

@Component({
  templateUrl: 'app.html',
  providers: [WorksService, CategoriesService],
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.rootPage = Routes.getRootPage(true); // false in when auth is defined
  }
}
