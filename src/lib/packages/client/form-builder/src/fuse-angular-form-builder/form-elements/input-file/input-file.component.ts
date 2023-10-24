import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BaseInputFileComponent} from "@next-levels/next-framework-client";

@Component({
  selector: 'nxt-input-file',
  templateUrl: './input-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent extends BaseInputFileComponent {}
