import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { BaseInputComponent } from './base-input.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nxt-input-text',
  template: '<ng-container ></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseInputTextComponent
  extends BaseInputComponent
  implements OnInit
{
  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    @Inject('formStyles') public override formStyles: string
  ) {
    super(cdRef, translateService, formStyles);
  }
}
