import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import { BaseInputTextComponent } from '../../../index';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModalComponent } from '../../../../../dynamic-modals/src/lib/components/translate-modal/translate-modal.component';

@Component({
  selector: 'nxt-input-text',
  templateUrl: './input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent extends BaseInputTextComponent {
  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public readonly _matDialog: MatDialog,
    @Inject('formStyles') public override formStyles: string
  ) {
    super(cdRef, translateService, formStyles);
  }

  translateField(): string {
    this._matDialog.open(TranslateModalComponent, {
      minWidth: '50%',
      autoFocus: true,
      data: {
        formController: this.formController,
        field: this.formField,
      },
    });
    return 'input-text';
  }
}
