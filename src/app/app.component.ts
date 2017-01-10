import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Routes } from './app.routes';

import {Auth} from '../providers/auth';

import { WorksService } from '../providers/works.service';
import { CategoriesService } from '../providers/categories.service';
import { ArtistsService } from '../providers/artists.service';
import { UsersService } from '../providers/users.service';

@Component({
  templateUrl: 'app.html',
  providers: [WorksService, CategoriesService, ArtistsService, UsersService],
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, private auth:Auth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  ngOnInit() {
    this.rootPage = Routes.getRootPage(false); // false in when auth is defined
  }
}
