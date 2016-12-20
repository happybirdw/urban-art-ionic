import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Map } from '../components/map/map';
import { HeaderContentComponent } from '../components/header-content/header-content';
import { Routes } from './app.routes';

import { Endpoints } from '../providers/endpoints';

const app: Array<any> = [MyApp];
const pages: Array<any> = Routes.getPages();
const components: Array<any> = [
  Map,
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

@NgModule({
  declarations: app.concat(pages).concat(components),
  imports: [
    IonicModule.forRoot(MyApp, appIonicConfig, Routes.getDeepLinkerConfig())
  ],
  bootstrap: [IonicApp],
  entryComponents: app.concat(pages),
  providers: [
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }, 
    Endpoints
    ],
})
export class AppModule {}
