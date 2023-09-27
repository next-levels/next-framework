import { ChangeDetectorRef, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { DatePipe } from '@angular/common';
import { EnvironmentStorageService } from '../../../../../../angular-commons/src/lib/environment-storage/environment-storage.service';
export declare class ViewFileComponent extends BaseViewComponent implements OnInit {
    private datePipe;
    cdRef: ChangeDetectorRef;
    private environmentStorage;
    baseUrl: string;
    constructor(datePipe: DatePipe, cdRef: ChangeDetectorRef, environmentStorage: EnvironmentStorageService);
    ngOnInit(): void;
}
