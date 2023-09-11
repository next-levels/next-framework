import { Component, Input, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'vosdellen-view-currency',
  templateUrl: './view-currency.component.html',
})
export class ViewCurrencyComponent
  extends BaseViewComponent
  implements OnInit {}
