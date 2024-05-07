import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputComponent } from './base-input.component';
import { EnvironmentStorageService } from '../../../../../angular-commons/src';
import { MatDialog } from '@angular/material/dialog';
import { BaseFile } from '@next-levels/types';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import Swal from 'sweetalert2';

@Component({
  selector: 'nxt-input-imagefile',
  template: '<ng-container ></ng-container>',
  encapsulation: ViewEncapsulation.None,
})
export class BaseInputMultiImageFileComponent extends BaseInputComponent {
  baseApiUrl = '';
  baseUrl = '';

  attachment_type: string;
  attachment_id: number;

  files: BaseFile[] = [];
  selectedFile: BaseFile;
  clickLock = false;

  constructor(
    public _httpClient: HttpClient,
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    private environment: EnvironmentStorageService,
    public _http: HttpClient,
    public readonly _matDialog: MatDialog,
    private route: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(cdRef, translateService);
    this.baseUrl = this.environment.baseUrl;
  }

  override async init() {
    super.init();
    this.attachment_type = this.formController.getModel().apiAlias;

    this.attachment_id = +this.route.snapshot.paramMap.get('id');

    if (this.formField?.options?.base_path) {
      this.baseApiUrl = this.baseUrl + this.formField.options.base_path;
    } else {
      this.baseApiUrl = this.baseUrl + '/api/files/';
    }

    // this.files = (await firstValueFrom(
    //   this._httpClient.get(
    //     `${this.baseApiUrl}download/${this.attachment_type}/${this.attachment_id}/${this.formField.name}`
    //   )
    // )) as BaseFile[];

    const formValue = this.formController.getForm().value[this.formField.name];
    this.files = [...formValue];

    if (this.formField && this.formField?.required) {
      this.formField.label = this.formField.label + '*';
    }

    this._changeDetectorRef.detectChanges();
  }

  /**
   * Upload avatar
   *
   * @param pFileList
   */
  public async uploadFile(pFileList: File[]): Promise<void> {
    if (!pFileList.length) {
      return;
    }
    const formData = new FormData();

    const file = pFileList[0];

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      return;
    }

    formData.append('sort_order', this.files.length.toString());
    formData.append('file', file, file.name);

    firstValueFrom(
      this._httpClient.post(
        `${this.baseApiUrl}upload/${this.attachment_type}/${this.attachment_id}/${this.formField.name}`,
        formData
      )
    ).then((response: any) => {
      const path = `${this.baseApiUrl}${response.id}`;
      // this.getImageBrightness(path).then((brightness) => {
      //   formData.append('brightness', brightness.toString());
      // });

      this.files = [...this.files, ...[response]];

      this.formController
        .getForm()
        .patchValue({ [this.formField.name]: this.files });

      this._changeDetectorRef.detectChanges();
    });
  }

  drop(event: CdkDragDrop<BaseFile[]>) {
    const temp = [];
    this.files.forEach((val) => temp.push(Object.assign({}, val)));
    const prevSort = temp[event.previousIndex].sort_order;
    temp[event.previousIndex].sort_order = temp[event.currentIndex].sort_order;
    temp[event.currentIndex].sort_order = prevSort;
    this.files = temp.slice().sort((a, b) => a.sort_order - b.sort_order);

    this.formController
      .getForm()
      .patchValue({ [this.formField.name]: this.files });

    this.patchFile(temp[event.previousIndex]);
    this.patchFile(temp[event.currentIndex]);
  }

  patchFile(file: BaseFile): void {
    firstValueFrom(this._httpClient.patch(this.baseApiUrl, file)).then(
      (response: any) => {
        this._changeDetectorRef.detectChanges();
      }
    );
  }

  onDrag(): void {
    this.clickLock = true;
  }

  selectFile(file: BaseFile): void {
    if (this.clickLock) {
      this.clickLock = false;
      return;
    }
    this.selectedFile = file;
    this._changeDetectorRef.markForCheck();
  }

  deleteFile(file: BaseFile): void {
    Swal.fire({
      text: 'Sind Sie sich sicher, dass Sie das Bild löschen möchten?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Nein, abbrechen',
    }).then((result) => {
      if (result.value) {
        firstValueFrom(
          this._httpClient.delete(this.baseApiUrl, {
            params: { id: file.id },
          })
        ).then((response: any) => {
          this.files.splice(this.files.indexOf(file), 1);
          this.formController
            .getForm()
            .patchValue({ [this.formField.name]: this.files });
          this._changeDetectorRef.markForCheck();
        });
      } else if (result.isDismissed) {
      }
    });
  }

  changeCoverImage(clickedFile: BaseFile): void {
    this.files.forEach((file, index) => {
      let changed = false;
      const updatedFile = { ...file };
      if (updatedFile.id === clickedFile.id) {
        updatedFile.is_cover_image = !updatedFile.is_cover_image;
        changed = true;
      } else if (updatedFile.is_cover_image) {
        updatedFile.is_cover_image = false;
        changed = true;
      }
      if (changed) {
        this.patchFile(updatedFile);
        this.files[index] = updatedFile;
      }
    });
    this.formController
      .getForm()
      .patchValue({ [this.formField.name]: this.files });
  }
}
