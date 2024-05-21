import 'reflect-metadata';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { MinimizeService } from '../../services/minimize/minimize.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FormController } from '../../../../../form-builder';
import { ModelTranslationService } from '../../../../../angular-commons';

@Component({
  selector: 'translate-modal',
  templateUrl: './translate-modal.component.html',
})
export class TranslateModalComponent implements AfterViewInit, OnInit {
  @Input() action: () => void;
  @Input() formController: FormController;
  @Input() field: any;
  className = '';
  langController: FormController;
  loading = false;
  languages: any[];

  constructor(
    private readonly _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      field: any;
      formController: FormController;
    },
    public minimizeService: MinimizeService,
    public translateService: TranslateService,
    public dialogRef: MatDialogRef<TranslateModalComponent>,
    private _modelTranslationService: ModelTranslationService,
    private cdRef: ChangeDetectorRef
  ) {
    this.field = data.field;
    this.formController = data.formController;
  }

  ngOnInit(): void {
    this._modelTranslationService.langs.subscribe((langs) => {
      this.languages = langs;
    });
    const model = this.formController.getClassName();
    const id = this.formController.getForm().value.id;
    const field = this.field.name;

    this._modelTranslationService
      .getField(model, id, field)
      .subscribe((res) => {
        let data = res.reduce((acc, item) => {
          acc[item.lang_id] = item.value;
          return acc;
        }, {});

        let defaultLAng = this.languages.filter((lang) => lang.iso === 'de');

        let datawithDefaultLang = {
          ...data,
          ...{ [defaultLAng[0].id]: this.formController.getValue(field) },
        };

        this.langController = new FormController(
          datawithDefaultLang,
          this.formController.getFacade(),
          this.formController.getModelDefinition(),
          { validateOnChange: false }
        );
      });
  }

  async translateAll() {
    this.loading = true;
    const data = this.langController.getForm().value;
    const langs = this.languages;
    const source_id = 'de';
    this._modelTranslationService
      .getAutomaticTranslation(langs, source_id, data)
      .subscribe((res) => {
        this.loading = false;
        this.langController.getForm().patchValue(res);
        this.cdRef.detectChanges();
      });
  }

  getClonedField(langId: string) {
    return {
      type: this.field.type,
      noLabel: true,
      name: langId + '',
    };
  }

  ngAfterViewInit() {}

  close() {
    this._matDialog.closeAll();
  }

  dataOutput(value) {
    console.log(value);
  }

  fireAction() {
    const langs = this.langController.getForm().value;
    const dto = [];

    for (const lang in langs) {
      if (langs.hasOwnProperty(lang)) {
        dto.push({
          model_type: this.formController.getClassName(),
          model_id: this.formController.getForm().value.id,
          lang_id: parseInt(lang),
          content: langs[lang], // Ensure content is assigned the correct value
        });
      }
    }

    this._modelTranslationService
      .updateTranslations(dto, this.field.name) // Ensure dto is passed here
      .subscribe((res) => {
        this.dialogRef.close(langs);
      });
  }
}
