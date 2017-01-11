import { Component, Input, EventEmitter, Output } from '@angular/core';

/*
  Generated class for the HeaderContent component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContentComponent {

  @Input() title: string;
  @Input() backEnabled: boolean;
  showBack: boolean;

  @Output() onBack: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.showBack = this.backEnabled;
  }

  onClickBack() {
    this.onBack.emit({})
  }

  showMore() {
    
  }
}
