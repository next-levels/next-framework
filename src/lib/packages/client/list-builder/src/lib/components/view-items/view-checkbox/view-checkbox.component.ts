import { Component, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'vosdellen-view-checkbox',
  templateUrl: './view-checkbox.component.html',
})
export class ViewCheckboxComponent extends BaseViewComponent implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this._value = this._value ? 'Ja' : 'Nein';
  }
}
