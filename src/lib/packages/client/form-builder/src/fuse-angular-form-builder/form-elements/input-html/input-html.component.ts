import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseInputHtmlComponent } from '../../../index';
import { TranslateModalComponent } from '@next-levels/next-framework-client';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'nxt-input-html',
  templateUrl: './input-html.component.html',
})
export class InputHtmlComponent extends BaseInputHtmlComponent {
  public override quillConfiguration = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video', 'formula'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      ['link'],
      ['clean'],
    ],
  };

  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public readonly _matDialog: MatDialog,
    @Inject('formStyles') public override formStyles: string
  ) {
    super(cdRef, translateService, formStyles);
  }

  override onEventChange(event: any) {
    if (event.value) {
      this.dataOutput.emit(event.value.toISOString());
    }
  }

  translateField(): string {
    this._matDialog.open(TranslateModalComponent, {
      minWidth: '70%',
      autoFocus: true,
      data: {
        formController: this.formController,
        field: this.formField,
      },
    });
    return 'input-text';
  }
}
