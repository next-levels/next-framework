import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputFileComponent } from '../../../index';

@Component({
  selector: 'nxt-input-image',
  templateUrl: './input-image.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputImageComponent extends BaseInputFileComponent {}
