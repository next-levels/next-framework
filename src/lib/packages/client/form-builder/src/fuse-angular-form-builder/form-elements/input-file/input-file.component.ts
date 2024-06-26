import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputFileComponent } from '../../../lib/components/base-components/base-input-file.component';

@Component({
  selector: 'nxt-input-file',
  templateUrl: './input-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent extends BaseInputFileComponent {}
