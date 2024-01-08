import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputImageFileComponent } from '../../../lib/components/base-components/base-input-imagefile.component';

@Component({
  selector: 'nxt-input-image',
  templateUrl: './input-imagefile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputImageFileComponent extends BaseInputImageFileComponent {}
