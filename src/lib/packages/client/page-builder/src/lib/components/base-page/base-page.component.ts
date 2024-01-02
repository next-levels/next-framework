import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Inject,
  Input,
  OnDestroy,
  OnInit,
  Output, ViewChild, ViewContainerRef,
} from '@angular/core';

import {BaseElementModel} from "../../types/base.element.model";
import {BasePageComponents} from "../../types/base-components.model";


@Component({
  selector: 'page-element',
  template: '<ng-template #input></ng-template>',
})
export class BasePageComponent implements  AfterViewInit {
  @ViewChild('input', { read: ViewContainerRef }) view:
      | ViewContainerRef
      | undefined;

  @Input() element: BaseElementModel;


  constructor(
      private cdRef: ChangeDetectorRef,
      @Inject('pageBuilderComponents')
      private pageBuilderComponents: BasePageComponents
  ) {}

  ngAfterViewInit() {

    console.log(this.element)
    console.log(this.pageBuilderComponents)

      const componentRef = this.view.createComponent(
          this.pageBuilderComponents[this.element.name]
        );
    console.log(componentRef)

      this.initComponent(componentRef);
        this.cdRef.detectChanges();
    }

  initComponent(componentRef: any) {
    console.log(componentRef)
    console.log( this.element)
    componentRef.instance.element = this.element;

  }

}
