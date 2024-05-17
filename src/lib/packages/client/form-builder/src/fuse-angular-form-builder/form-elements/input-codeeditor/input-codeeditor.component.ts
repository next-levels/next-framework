import {
  ChangeDetectorRef,
  Component,
  Inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BaseInputTextareaComponent } from '../../../index';
import { JsonEditorOptions } from 'ang-jsoneditor';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'nxt-input-codeeditor',
  templateUrl: './input-codeeditor.component.html',
})
export class InputCodeeditorComponent extends BaseInputTextareaComponent {
  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;

  public editorOptions: JsonEditorOptions;
  public data: any;
  theme = 'vs-dark';
  model: CodeModel = null;
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public readonly _matDialog: MatDialog,
    @Inject('formStyles') public override formStyles: string
  ) {
    super(cdRef, translateService, formStyles);
  }

  override init() {
    this.data = JSON.stringify(this.value, null, 2);

    this.model = {
      language: 'json',
      value: this.value,
      uri: 'main.json',
    };
  }

  onCodeChanged(value) {
    console.log('CODE', value);
  }

  openEditor(row: any): void {
    this._matDialog.open(this.modalTemplate, {
      minWidth: '60%',
      minHeight: '60%',
      autoFocus: false,
      data: {
        data: this.value,
      },
    });
  }
}
