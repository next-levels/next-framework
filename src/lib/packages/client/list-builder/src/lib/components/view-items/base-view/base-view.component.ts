import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ListController } from '../../../controllers/ListController';
import { ListOptions } from '@next-levels/types';

@Component({
  template: '<ng-container ></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseViewComponent implements OnInit {
  @Input() fieldName: string;
  @Input() listController: ListController;
  @Input() viewObject: any;
  @Input() detailView = false;
  @Input() listField: ListOptions;

  public _field: ListOptions | undefined;
  public _value: any;

  constructor(public cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._value = this.viewObject[this.fieldName];
  }
}
