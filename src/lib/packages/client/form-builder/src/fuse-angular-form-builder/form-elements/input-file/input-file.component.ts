import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BaseInputFileComponent} from  "../../../index";

@Component({
  selector: 'nxt-input-file',
  templateUrl: './input-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent extends BaseInputFileComponent {}
