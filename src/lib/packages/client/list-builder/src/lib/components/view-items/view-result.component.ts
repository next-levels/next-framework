import { Component, OnInit } from '@angular/core';
import {BaseViewComponent} from "./base-view/base-view.component";

@Component({
  selector: 'next-view-result',
   template: `


     @if (this.indicator <= 1) {
       <span class="flex items-center"><span><span
         class="flex items-end w-1 h-4 bg-red-200 rounded overflow-hidden ng-star-inserted"><span
         class="flex w-full h-1/3 bg-red-600"></span></span></span><span
         class="ml-3 leading-4">{{ _value }}</span></span>
     } @else if (this.indicator > 1 && this.indicator <= 3) {
       <span class="flex items-center"><span><span
         class="flex items-end w-1 h-4 bg-amber-200 rounded overflow-hidden ng-star-inserted"><span
         class="flex w-full h-2/3 bg-amber-600"></span></span></span><span
         class="ml-3 leading-4">{{ _value }}</span></span>
      } @else {
       <span class="flex items-center"><span><span
         class="flex items-end w-1 h-4 bg-green-200 rounded overflow-hidden ng-star-inserted"><span
         class="flex w-full h-full bg-green-600"></span></span></span><span
         class="ml-3 leading-4">{{ _value }}</span></span>
      }
    `
})
export class ViewResultComponent extends BaseViewComponent implements OnInit {

  indicator: number = 0;
  override ngOnInit() {
    super.ngOnInit();
    this.indicator = this._value / 20;
  }
}
