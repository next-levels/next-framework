import {
  ChangeDetectorRef,
  Component,
  Inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BaseInputTextareaComponent } from '../../../index';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'nxt-input-jsoneditor',
  templateUrl: './input-jsoneditor.component.html',
})
export class InputJsoneditorComponent extends BaseInputTextareaComponent {
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;
  @ViewChild(JsonEditorComponent, { static: false })
  editor: JsonEditorComponent;

  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public readonly _matDialog: MatDialog,
    @Inject('formStyles') public override formStyles: string
  ) {
    super(cdRef, translateService, formStyles);
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ['code']; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

    this.data = this.data ?? JSON.stringify(this.value, null, 2);
  }

  save() {
    this.value = JSON.stringify(this.editor.get());
    this.data = JSON.stringify(this.value, null, 2);
    this.fg.patchValue({ [this.formField.name]: this.value });
    this.dataOutput.emit(this.value);
    this._matDialog.closeAll();
  }

  getData(event: any) {
    if (event.value) {
      this.dataOutput.emit(event.value.toISOString());
    }
  }

  openEditor(row: any): void {
    this._matDialog.open(this.modalTemplate, {
      minWidth: '60%',
      autoFocus: false,
      data: {
        data: this.value,
      },
    });
  }
}
