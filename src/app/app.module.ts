import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { Map } from '../components/map/map';
import { Map1 } from '../components/map1/map';
import { HeaderContentComponent } from '../components/header-content/header-content';
import { Routes } from './app.routes';

import { Endpoints } from '../providers/endpoints';
import { Auth } from '../providers/auth';

const app: Array<any> = [MyApp];
const pages: Array<any> = Routes.getPages();
const components: Array<any> = [
  Map,
  Map1,
  HeaderContentComponent
];
const appIonicConfig = {
  mode: 'md',
  platforms: {
    ios: {
      tabsPlacement: 'bottom',
    }
  }
};

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    // headerPrefix: YOUR_HEADER_PREFIX,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: app.concat(pages).concat(components),
  imports: [
    IonicModule.forRoot(MyApp, appIonicConfig, Routes.getDeepLinkerConfig())
  ],
  bootstrap: [IonicApp],
  entryComponents: app.concat(pages),
  providers: [
    {
      //provide: [ErrorHandler, AuthHttp],
      provide: AuthHttp,
      useFactory: getAuthHttp,
      useClass: IonicErrorHandler,
      deps: [Http]
    }, 
    Endpoints,
    Auth
    ],
})
export class AppModule {}
