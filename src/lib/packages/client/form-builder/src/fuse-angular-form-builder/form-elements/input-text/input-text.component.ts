import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputTextComponent } from '@next-levels/next-framework-client';

@Component({
  selector: 'nxt-input-text',
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends BaseInputTextComponent {}
