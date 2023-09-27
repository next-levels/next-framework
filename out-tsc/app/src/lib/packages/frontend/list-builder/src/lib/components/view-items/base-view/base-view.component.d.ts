import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ListController } from '../../../controllers/ListController';
import { ListOptions } from '../../../../../../../shared/generics/src';
export declare class BaseViewComponent implements OnInit {
    cdRef: ChangeDetectorRef;
    fieldName: string;
    listController: ListController;
    viewObject: any;
    detailView: boolean;
    listField: ListOptions;
    _field: ListOptions | undefined;
    _value: any;
    constructor(cdRef: ChangeDetectorRef);
    ngOnInit(): void;
}
