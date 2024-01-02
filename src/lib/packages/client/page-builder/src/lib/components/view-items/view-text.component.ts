import { AfterViewInit, Component, OnInit } from '@angular/core';
import {BaseViewComponent} from "./base-view.component";
import {TextElement} from "../../elements/text.element";

@Component({
  selector: 'view-text',
  template: '<div  [classList]="_styles" [innerHTML]=" element.config.content"></div >',
})
export class ViewTextComponent extends BaseViewComponent implements AfterViewInit {

  config: TextElement;
  override ngAfterViewInit() {
    console.log(this.element)
  }
}
