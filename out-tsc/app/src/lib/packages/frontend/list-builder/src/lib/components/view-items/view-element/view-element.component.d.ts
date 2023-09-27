import { AfterViewInit, ChangeDetectorRef, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ListController } from '../../../controllers/ListController';
import { ListComponents, ListOptions } from '../../../../../../../shared/generics/src';
export declare class ViewElementComponent implements AfterViewInit, OnInit {
    private translateService;
    private cdRef;
    private listBuilderComponents;
    view: ViewContainerRef | undefined;
    fieldName: string;
    viewModel: any;
    viewObject: any;
    detailView: boolean;
    listController: ListController;
    listField: any;
    value: any;
    constructor(translateService: TranslateService, cdRef: ChangeDetectorRef, listBuilderComponents: ListComponents);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    getSettingsField(field: string): ListOptions;
    getBuildField(field: string): ListOptions;
    initComponent(componentRef: any): void;
}
