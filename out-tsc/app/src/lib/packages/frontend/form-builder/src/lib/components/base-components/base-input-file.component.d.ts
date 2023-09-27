import { ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputComponent } from './base-input.component';
import { EnvironmentStorageService } from '../../../../../angular-commons/src';
export declare class BaseInputFileComponent extends BaseInputComponent {
    _httpClient: HttpClient;
    cdRef: ChangeDetectorRef;
    translateService: TranslateService;
    environmentStorage: EnvironmentStorageService;
    editMode: boolean;
    edit: boolean;
    baseApiUrl: string;
    baseUrl: string;
    file_id: number;
    constructor(_httpClient: HttpClient, cdRef: ChangeDetectorRef, translateService: TranslateService, environmentStorage: EnvironmentStorageService);
    init(): void;
    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): Promise<void>;
    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode?: boolean | null): void;
}
