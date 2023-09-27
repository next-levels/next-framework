import { ChangeDetectorRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseInputTextComponent } from '../../../../public_api';
export declare class InputTextComponent extends BaseInputTextComponent implements OnInit {
    cdRef: ChangeDetectorRef;
    translateService: TranslateService;
    constructor(cdRef: ChangeDetectorRef, translateService: TranslateService);
}
