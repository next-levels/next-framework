import { Component } from '@angular/core';
import { BaseInputTextComponent } from '../../..';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'nxt-input-currency',
  templateUrl: './input-currency.component.html',
})
export class InputCurrencyComponent extends BaseInputTextComponent {}
