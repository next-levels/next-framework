import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputTextComponent } from '../../../../public_api';

@Component({
  selector: 'nxt-input-date',
  templateUrl: './input-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent extends BaseInputTextComponent {}
