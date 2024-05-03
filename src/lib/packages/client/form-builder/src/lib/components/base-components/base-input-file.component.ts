import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputComponent } from './base-input.component';
import { EnvironmentStorageService } from '../../../../../angular-commons';

@Component({
  selector: 'nxt-input-file',
  template: '<ng-container ></ng-container>',
})
export class BaseInputFileComponent extends BaseInputComponent {
  editMode = false;
  edit = true;
  baseApiUrl = '';
  baseUrl = '';
  file_id: number;
  file_name = '';
  allowedTypes = [
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    'text/plain',
    'application/pdf',
  ];

  constructor(
    public _httpClient: HttpClient,
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public environmentStorage: EnvironmentStorageService
  ) {
    super(cdRef, translateService);
    this.baseUrl = this.environmentStorage.baseUrl;
    this.baseApiUrl = this.baseUrl + '/api/files/';
  }

  override init() {
    super.init();
    this.file_id = this.formController
      ?.getForm()
      .get(this.formField.name)?.value;
    if (this.file_id) {
      this._httpClient.get(`${this.baseApiUrl}upload`);
    }

    if (this.formField?.required) {
      this.formField.label = this.formField.label + '*';
    }
    if (this.formField?.options?.allowedTypes?.length) {
      this.allowedTypes = this.formField?.options?.allowedTypes;
    }
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

    const file = fileList[0];

    if (!this.allowedTypes.includes(file.type)) {
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
      this.file_name = response.name;
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
