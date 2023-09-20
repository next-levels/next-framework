import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputTextComponent } from '../../../../public_api';

@Component({
  selector: 'nxt-input-date',
  templateUrl: './input-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDateComponent
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
