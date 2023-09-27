import { ChangeDetectorRef, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
export declare class ViewRelationComponent extends BaseViewComponent implements OnInit {
    cdRef: ChangeDetectorRef;
    router: Router;
    store: Store<any>;
    detail_fields: any[];
    constructor(cdRef: ChangeDetectorRef, router: Router, store: Store<any>);
    ngOnInit(): void;
    mapData(fields: any, data: any): any;
    mapDataDetails(fields: any, data: any): any[];
    openRelation(): void;
}
