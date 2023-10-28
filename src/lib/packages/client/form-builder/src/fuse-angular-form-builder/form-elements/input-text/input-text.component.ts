import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputTextComponent } from "../../../index";

@Component({
  selector: 'nxt-input-text',
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends BaseInputTextComponent {}
