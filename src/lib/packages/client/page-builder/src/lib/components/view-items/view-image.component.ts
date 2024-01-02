import { AfterViewInit, Component, OnInit } from '@angular/core';
import {BaseViewComponent} from "./base-view.component";
import {ImageElement} from "@next-levels/next-framework-client";

@Component({
  selector: 'view-image',
  template: '<div  [classList]="_styles" [innerHTML]=" element.config.content"></div >',
})
export class ViewImageComponent extends BaseViewComponent implements AfterViewInit {

  config: ImageElement;

  override ngAfterViewInit() {
    console.log(this.element)
  }
}
