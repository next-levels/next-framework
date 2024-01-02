import {AfterViewInit, Component} from '@angular/core';
import {BaseViewComponent} from "./base-view.component";
import {BoxElement} from "@next-levels/next-framework-client";

@Component({
    template: '<div  [classList]="_styles" [innerHTML]=" element.config.content"></div >',
})
export class ViewBoxComponent extends BaseViewComponent implements AfterViewInit {

    config: BoxElement;

    override ngAfterViewInit() {
        console.log(this.element)
    }
}
