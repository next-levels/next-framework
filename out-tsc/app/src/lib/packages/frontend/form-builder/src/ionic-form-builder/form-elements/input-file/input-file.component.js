"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFileComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const ngx_1 = require("@awesome-cordova-plugins/camera/ngx");
const angular_1 = require("@ionic/angular");
const http_1 = require("@angular/common/http");
const core_2 = require("@ngx-translate/core");
const rxjs_1 = require("rxjs");
const public_api_1 = require("../../../../public_api");
const src_1 = require("../../../../../angular-commons/src");
let InputFileComponent = class InputFileComponent extends public_api_1.BaseInputFileComponent {
    constructor(_httpClient, cdRef, translateService, platform, camera, actionSheetController, http, environmentStorage) {
        super(_httpClient, cdRef, translateService, environmentStorage);
        this._httpClient = _httpClient;
        this.cdRef = cdRef;
        this.translateService = translateService;
        this.platform = platform;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.http = http;
        this.environmentStorage = environmentStorage;
        this.uploading = false;
        this.bill = null;
        this.file_is_pdf = false;
        this.file = null;
        this.api = {};
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
        }
        else {
            this.filePicker.nativeElement.click();
        }
    }
    async onFileSelect(event) {
        if (this.isNative()) {
            // await FilePicker.showFilePicker({ # TODO
            //   fileTypes: ['pdf', 'image'],
            // });
        }
        if (event.target.files.length > 0) {
            this.uploading = true;
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = async (fileData) => { };
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
            (0, rxjs_1.firstValueFrom)(this.http.post(this.baseUrl + '/files/upload/public', formData)).then((file) => {
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
        const options = {
            quality: 40,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
        };
        this.camera.getPicture(options).then((imageData) => {
            (0, rxjs_1.firstValueFrom)(this.http.post(this.baseUrl + '/files/upload/public/base64', {
                base64: imageData,
            })).then((file) => {
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
            }, (err) => {
                console.log(err);
            });
        }, (err) => {
            console.log(err);
        });
    }
};
exports.InputFileComponent = InputFileComponent;
tslib_1.__decorate([
    (0, core_1.ViewChild)('filePicker', { static: false }),
    tslib_1.__metadata("design:type", core_1.ElementRef)
], InputFileComponent.prototype, "filePicker", void 0);
exports.InputFileComponent = InputFileComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-file',
        templateUrl: './input-file.component.html',
        styleUrls: ['./input-file.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
        core_1.ChangeDetectorRef,
        core_2.TranslateService,
        angular_1.Platform,
        ngx_1.Camera,
        angular_1.ActionSheetController,
        http_1.HttpClient,
        src_1.EnvironmentStorageService])
], InputFileComponent);
//# sourceMappingURL=input-file.component.js.map