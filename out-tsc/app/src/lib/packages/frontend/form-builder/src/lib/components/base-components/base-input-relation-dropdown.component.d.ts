import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { InstanceRegistryService } from '../../../../../angular-commons/src';
import { BaseInputComponent } from './base-input.component';
import { ModelRelationOptions } from '../../../../../../shared/generics/src';
export declare class BaseInputRelationDropdownComponent extends BaseInputComponent implements OnInit {
    store: Store<any>;
    cdRef: ChangeDetectorRef;
    translateService: TranslateService;
    private registry;
    data: any[];
    protected _value: string;
    settings: ModelRelationOptions;
    options: any[];
    selected: string | number;
    facade: any;
    constructor(store: Store<any>, cdRef: ChangeDetectorRef, translateService: TranslateService, registry: InstanceRegistryService);
    init(): void;
    logChange(event: any): void;
    ngOnInit(): void;
    private initFilter;
    private filterArrayByProperty;
    mapData(data: any): void;
}
