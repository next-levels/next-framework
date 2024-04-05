import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BaseInputMultiImageFileComponent } from '../../../lib/components/base-components/base-input-multiimagefile.component';

@Component({
  selector: 'nxt-input-multiimage',
  templateUrl: './input-multiimagefile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMultiImageFileComponent extends BaseInputMultiImageFileComponent {}
