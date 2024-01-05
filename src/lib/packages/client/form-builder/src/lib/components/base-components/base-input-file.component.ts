import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputComponent } from './base-input.component';
import { EnvironmentStorageService } from '../../../../../angular-commons/src';

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
    if (this.formField && this.formField?.required) {
      this.formField.label = this.formField.label + '*';
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

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
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
