import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { BaseInputTextComponent } from '@nxtlvls/form-builder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nxt-input-text',
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent
  extends BaseInputTextComponent
  implements OnInit
{
  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService
  ) {
    super(cdRef, translateService);
   }
}
