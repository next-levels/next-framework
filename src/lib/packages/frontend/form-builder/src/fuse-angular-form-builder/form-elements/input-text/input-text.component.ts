import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputTextComponent } from '@nxtlvls/form-builder';

@Component({
  selector: 'nxt-input-text',
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends BaseInputTextComponent {}
