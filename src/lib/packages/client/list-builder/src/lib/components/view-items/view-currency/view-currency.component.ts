import { Component, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'vosdellen-view-currency',
  templateUrl: './view-currency.component.html',
})
export class ViewCurrencyComponent extends BaseViewComponent implements OnInit {
  override ngOnInit() {
    super.ngOnInit();
    this._value = Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(this._value));
  }
}
