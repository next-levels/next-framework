import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputFileComponent } from '../../../../public_api';
import { EnvironmentStorageService } from '../../../../../angular-commons/src';
export declare class InputFileComponent extends BaseInputFileComponent {
    _httpClient: HttpClient;
    cdRef: ChangeDetectorRef;
    translateService: TranslateService;
    platform: Platform;
    private camera;
    actionSheetController: ActionSheetController;
    private http;
    environmentStorage: EnvironmentStorageService;
    uploading: boolean;
    bill: any;
    file_is_pdf: boolean;
    file: any;
    filePicker: ElementRef;
    api: any;
    constructor(_httpClient: HttpClient, cdRef: ChangeDetectorRef, translateService: TranslateService, platform: Platform, camera: Camera, actionSheetController: ActionSheetController, http: HttpClient, environmentStorage: EnvironmentStorageService);
    isNative(): boolean;
    takeImage(ev: any): Promise<void>;
    onFileSelect(event: any): Promise<void>;
    getPhotoWeb(event: any): void;
    getPhotoNative(sourceType: any): void;
}
