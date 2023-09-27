import { ChangeDetectorRef, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { DatePipe } from '@angular/common';
export declare class ViewDateComponent extends BaseViewComponent implements OnInit {
    private datePipe;
    cdRef: ChangeDetectorRef;
    constructor(datePipe: DatePipe, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
}
