import { ChangeDetectorRef, OnInit } from '@angular/core';
import { BaseInputComponent } from './base-input.component';
import { TranslateService } from '@ngx-translate/core';
export declare class BaseInputTextComponent extends BaseInputComponent implements OnInit {
    cdRef: ChangeDetectorRef;
    translateService: TranslateService;
    constructor(cdRef: ChangeDetectorRef, translateService: TranslateService);
}
