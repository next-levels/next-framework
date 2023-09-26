import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'vosdellen-view-date',
  templateUrl: './view-date.component.html',
})
export class ViewDateComponent extends BaseViewComponent implements OnInit {
  constructor(
    private datePipe: DatePipe,
    public override cdRef: ChangeDetectorRef
  ) {
    super(cdRef);
  }
  override ngOnInit() {
    super.ngOnInit();
    this._value = this.datePipe.transform(this._value, 'dd.MM.yyyy HH:mm');
  }
}
