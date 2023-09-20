import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseInputFileComponent } from '../../../../public_api';

@Component({
  selector: 'nxt-input-file',
  templateUrl: './input-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent extends BaseInputFileComponent {}
