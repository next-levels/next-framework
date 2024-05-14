import { ChangeDetectorRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputComponent } from './base-input.component';
import { EnvironmentStorageService } from '../../../../../angular-commons';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'nxt-input-file',
  template: '<ng-container ></ng-container>',
})
export class BaseInputFileComponent extends BaseInputComponent {
  editMode = false;
  edit = true;
  baseApiUrl = '';
  baseUrl = '';
  file_id: string;
  file_name = '';
  file_type = '';
  file_size = '';
  // .bin files do not have a set MIME type
  // MDN recommends using application/octet-stream
  // macOS uploads them as application/macbinary
  // x-binary is also used by some browsers
  allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/svg+xml',
    'application/pdf',
  ];

  constructor(
    public _httpClient: HttpClient,
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public environmentStorage: EnvironmentStorageService //@Inject(FilesService) //private readonly filesService: FilesService
  ) {
    super(cdRef, translateService);
    this.baseUrl = this.environmentStorage.baseSocket;
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
  public async uploadFile(
    fileList: FileList | NgxFileDropEntry[]
  ): Promise<void> {
    if (!fileList.length) {
      return;
    }

    // Check the type of the first entry in the array to determine how to process it
    if (fileList[0] instanceof File) {
      // Directly handle FileList scenario
      this.handleFileUpload(fileList[0] as File);
    } else if (fileList[0] instanceof NgxFileDropEntry) {
      // Handle NgxFileDropEntry scenario
      const entry = fileList[0] as NgxFileDropEntry;
      if (entry.fileEntry.isFile) {
        const fileEntry = entry.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.handleFileUpload(file);
        });
      }
    }
  }

  private async handleFileUpload(file: File): Promise<void> {
    if (!this.allowedTypes.includes(file.type)) {
      return; // Optionally handle unsupported file types
    }

    const formData = new FormData();
    formData.append('file', file, file.name);

    try {
      const response: any = await firstValueFrom(
        this._httpClient.post(`${this.baseApiUrl}upload/file`, formData)
      );

      this.toggleEditMode(false);
      const tempPatch = {};
      tempPatch[this.formField.name] = response.id;
      this.formController?.getForm().patchValue(tempPatch);
      this.file_id = response.id;
      this.file_name = response.name;
      this.file_type = response.type;
      this.file_size = response.file_size;
    } catch (error) {
      console.error('Upload error:', error);
    }
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
