import { AfterViewInit, Component, OnInit } from '@angular/core';
import {BaseViewComponent} from "./base-view.component";
import {BoxElement, ButtonElement} from "@next-levels/next-framework-client";

@Component({
  template: '<div  [classList]="_styles" [innerHTML]=" element.config.content"></div >',
})
export class ViewButtonComponent extends BaseViewComponent implements AfterViewInit {

  config: ButtonElement;

  override ngAfterViewInit() {
    console.log(this.element)
  }
}
