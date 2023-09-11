import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { BaseInputFileComponent } from '@nxtlvls/form-builder';
import { FilePicker } from 'capacitor-file-picker';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'nxt-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent extends BaseInputFileComponent {
  uploading = false;
  bill: any = null;
  file_is_pdf = false;
  file: any = null;

  @ViewChild('filePicker', { static: false }) public filePicker: ElementRef;

  api: any = {};

  constructor(
    public _httpClient: HttpClient,
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    public platform: Platform,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private http: HttpClient
  ) {
    super(_httpClient, cdRef, translateService);
  }

  isNative() {
    return this.platform.is('cordova');
  }

  async takeImage(ev) {
    if (this.bill !== null) {
      this.bill = null;
      return;
    }
    if (this.isNative()) {
      const actionSheet = await this.actionSheetController.create({
        header: 'Bitte wählen',
        buttons: [
          {
            text: 'Aus Galerie wählen',
            handler: () => {
              this.getPhotoNative(this.camera.PictureSourceType.PHOTOLIBRARY);
            },
          },
          {
            text: 'Foto aufnehmen',
            handler: () => {
              this.getPhotoNative(this.camera.PictureSourceType.CAMERA);
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      });
      await actionSheet.present();
    } else {
      this.filePicker.nativeElement.click();
    }
  }

  public async onFileSelect(event) {
    if (this.isNative()) {
      await FilePicker.showFilePicker({
        fileTypes: ['pdf', 'image'],
      });
    }

    if (event.target.files.length > 0) {
      this.uploading = true;
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onload = async (fileData) => {};
      reader.readAsDataURL(file);
      this.uploading = false;
    }
  }

  getPhotoWeb(event) {
    if (event.target.files.length > 0) {
      this.uploading = true;
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);

      firstValueFrom(
        this.http.post(this.baseUrl + '/files/upload/public', formData)
      ).then((file: any) => {
        const tempPatch = {};

        tempPatch[this.formField.name] = file.id;
        this.formController?.getForm().patchValue(tempPatch);
        if (file.type === 'application/pdf') {
          this.file_is_pdf = true;
        }
        this.file = file;
        this.bill = this.baseUrl + '/files/' + file.id;
        this.uploading = false;
        this.cdRef.detectChanges();
      });
    }
  }

  getPhotoNative(sourceType) {
    this.uploading = true;
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        firstValueFrom(
          this.http.post(this.baseUrl + '/files/upload/public/base64', {
            base64: imageData,
          })
        ).then(
          (file: any) => {
            const tempPatch = {};
            tempPatch[this.formField.name] = file.id;
            this.formController?.getForm().patchValue(tempPatch);
            if (file.type === 'application/pdf') {
              this.file_is_pdf = true;
            }
            this.file = file;
            this.bill = this.baseUrl + '/files/' + file.id;
            this.uploading = false;
            this.cdRef.detectChanges();
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
