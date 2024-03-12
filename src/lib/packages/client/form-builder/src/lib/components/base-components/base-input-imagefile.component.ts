import {ChangeDetectorRef, Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputComponent } from './base-input.component';
import { EnvironmentStorageService } from '../../../../../angular-commons/src';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'nxt-input-imagefile',
  template: '<ng-container ></ng-container>',
})
export class BaseInputImageFileComponent extends BaseInputComponent {
  editMode = false;
  edit = true;
  baseApiUrl = '';
  baseUrl = '';
  file_id: number;

  isLoading = false;

  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>
  generatedImage ;
  textareaValue = '';

  constructor(
    public _httpClient: HttpClient,
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    private environment: EnvironmentStorageService,
    public _http: HttpClient,
    public readonly _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(cdRef, translateService);
    this.baseUrl = this.environment.baseUrl;
  }

  override init() {
    super.init();
    this.file_id = this.formController
      ?.getForm()
      .get(this.formField.name)?.value;

    if(this.formField?.options?.base_path){
      this.baseApiUrl = this.baseUrl  + this.formField.options.base_path;
    }else {
      this.baseApiUrl = this.baseUrl + '/api/files/';
    }

    if (this.formField && this.formField?.required) {
      this.formField.label = this.formField.label + '*';
    }
  }

  openAiModal(): void {
    this._matDialog.open(this.modalTemplate, {
      minWidth: '60%',
      minHeight: '60%',
      autoFocus: false
    });
  }

  generateOpenAi() {
    this.isLoading = true;
    const apiUrl = this.environment.baseUrl + '/api/openai/image';
    const params = {
      prompt: this.textareaValue
    };

    this._http.post<any>(apiUrl, params).subscribe(value => {

      this.generatedImage = value.result;
      this._changeDetectorRef.detectChanges();

      this.isLoading = false;
      this._matDialog.closeAll();

      return value;
    });
  }

  /**
   * Upload avatar
   *
   * @param fileList
   */
  public async uploadAvatar(fileList: FileList): Promise<void> {
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    if (!allowedTypes.includes(file.type)) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file, file.name);

    firstValueFrom(
      this._httpClient.post(`${this.baseApiUrl}upload`, formData)
    ).then((response: any) => {
      this.toggleEditMode(false);
      const tempPatch = {};
      tempPatch[this.formField.name] = response.id;
      this.formController?.getForm().patchValue(tempPatch);
      this.file_id = response.id;
    });
  }

  /**
   * Toggle edit mode
   *
   * @param editMode
   */
  public toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
    }

    // Mark for check
    this.cdRef.markForCheck();
  }
}
