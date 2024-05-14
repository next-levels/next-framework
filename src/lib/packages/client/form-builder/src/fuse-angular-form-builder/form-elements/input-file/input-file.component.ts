import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BaseInputFileComponent } from '../../../lib/components/base-components/base-input-file.component';
import { NgxFileDropComponent, NgxFileDropEntry } from 'ngx-file-drop';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'nxt-input-file',
  templateUrl: './input-file.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent extends BaseInputFileComponent {
  public files: File[] = [];
  @ViewChild('fileDropRef') fileDrop: NgxFileDropComponent;

  public dropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.files.push(file);
          console.log(droppedFile.relativePath, file);
        });
      }
    }
  }

  override async init() {
    super.init();
    if (this.file_id) await this.getFile(this.file_id);
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  openDialog(): void {
    this.fileDrop.openFileSelector();
  }

  getSource(key: string): string {
    console.log('url', this.baseApiUrl + key);
    return this.baseApiUrl + key;
  }

  public fileBrowseHandler(event: any): void {
    const filelist: FileList = event.target.files;
    for (let i = 0; i < filelist.length; i++) {
      const file = filelist.item(i);
      if (file) {
        this.files.push(file);
      }
    }
  }

  async deleteFile(file_id: string) {
    this.file_id = null;
    this.file_name = null;
    this.file_type = null;

    try {
      const response: any = await firstValueFrom(
        this._httpClient.delete(`${this.baseApiUrl}?id=${file_id}`)
      );
      const tempPatch = {};
      tempPatch[this.formField.name] = null;
      this.formController?.getForm().patchValue(tempPatch);
    } catch (error) {
      console.error('Upload error:', error);
    }

    this.cdRef.markForCheck();
  }

  downloadFile(file_id: string): void {
    this.downloadFileCall(file_id).subscribe({
      next: (response: HttpResponse<Blob>) => {
        let filename = this.file_name; // A default filename if none is specified
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, ''); // Remove potential quotes
          }
        }

        const blob = response.body;
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Download error:', error);
      },
    });
  }

  downloadFileCall(file_id: string): Observable<HttpResponse<Blob>> {
    const url = `${this.baseApiUrl}${file_id}/download`;
    return this._httpClient.get(url, {
      responseType: 'blob',
      observe: 'response', // Notice the 'observe' part
    });
  }

  async getFile(file_id: string) {
    try {
      const response: any = await firstValueFrom(
        this._httpClient.get(`${this.baseApiUrl}get/${file_id}`)
      );

      this.file_id = response.id;
      this.file_name = response.name;
      this.file_type = response.type;
      this.file_size = response.file_size;
    } catch (error) {
      console.error('Upload error:', error);
    }
  }
}
