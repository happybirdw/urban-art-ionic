import { Component } from '@angular/core';

import { AroundPage } from '../around/around';
import { WorksPage } from '../works/works';
import { FavoritePage } from '../favorite/favorite';
import { AddPage } from '../add/add';


@Component({
  templateUrl: 'tabs.html',

})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AroundPage;
  tab2Root: any = WorksPage;
  tab3Root: any = FavoritePage;
  tab4Root: any = AddPage;
  constructor() {

  }
}
