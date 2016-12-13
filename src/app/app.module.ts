import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Map} from '../components/map/map';

import { AroundPage } from '../pages/around/around';
import { WorksPage } from '../pages/works/works';
import { FavoritePage } from '../pages/favorite/favorite';
import { AddPage } from '../pages/add/add';
import { TabsPage } from '../pages/tabs/tabs';

import { Endpoints } from '../providers/endpoints';
import { WorksService } from '../providers/works.service';

@NgModule({
  declarations: [
    MyApp,
    AroundPage,
    WorksPage,
    FavoritePage,
    AddPage,
    TabsPage,
    Map
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AroundPage,
    WorksPage,
    FavoritePage,
    AddPage,
    TabsPage
  ],
  providers: [
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }, 
    Endpoints,
    WorksService
    ],
})
export class AppModule {}
