import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input, OnChanges,
  OnInit, SimpleChanges,
} from '@angular/core';
import {BaseElementModel} from "../../types/base.element.model";

@Component({
  template: '<ng-container ></ng-container>',
 })
export class BaseViewComponent implements OnInit, AfterViewInit {
  @Input() element: BaseElementModel;

  _value: any;
  _styles: any;
  _config: any;

  constructor(public cdRef: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    if (this.element && this.element.config) {
      console.log(this.element)
    }
    console.log(this.element)
    this._value = this.element.config.content;
    this._styles = this.element.styles;
    this.cdRef.detectChanges();
  }
  ngAfterViewInit() {
    console.log(this.element)
  }


  }
