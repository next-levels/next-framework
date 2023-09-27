import { AfterViewInit, ChangeDetectorRef, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ListController } from '../../controllers/ListController';
import { BaseFacadeType } from '../../../../../generic-store/src';
import { FilterOptions, PaginationMeta } from '../../../../../../shared/generics/src';
export declare class BaseTableDefaultComponent implements OnInit, OnDestroy, AfterViewInit {
    translateService: TranslateService;
    private activeRoute;
    private router;
    readonly _matDialog: MatDialog;
    private componentFactoryResolver;
    private cdRef;
    listController: ListController;
    showHeader: boolean;
    showSearch: boolean;
    selector: string;
    detailModal: boolean;
    route: string;
    childTable: boolean;
    searchQuery: any | null;
    rowClick: EventEmitter<any>;
    rowDelete: EventEmitter<any>;
    rowExport: EventEmitter<any>;
    rowCreate: EventEmitter<any>;
    getQueryRowsView: EventEmitter<any>;
    saveSearchQuery: EventEmitter<any>;
    paginator: MatPaginator;
    sort: MatSort;
    loading$: Observable<boolean>;
    private _unsubscribeAll;
    searchInputControl: FormControl;
    statusFilterControl: FormControl;
    displayedColumns: string[];
    fields: string[];
    dataSource: MatTableDataSource<any>;
    modelFacade: BaseFacadeType;
    model: any;
    pagination: PaginationMeta;
    filterOptions: FilterOptions;
    selection: SelectionModel<Element>;
    constructor(translateService: TranslateService, activeRoute: ActivatedRoute, router: Router, _matDialog: MatDialog, componentFactoryResolver: ComponentFactoryResolver, cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    getTimestamp(value: any): number;
    selectRow(row: any): void;
    delete(data: any): void;
    openAddInsurersModal(): void;
    openExportInsurersModal(): void;
    openAddModal(): void;
    export(): void;
    ConvertToCSV(objArray: any, headerList: any[]): string;
    openViewModal(row: any): void;
    trackByFn(index: number, item: any): any;
    ngOnDestroy(): void;
    setQuery(filterOptions: any[]): void;
    addSearchQueryCall(event: any): void;
    openSelectSearchQueryModal(event: any): void;
    isAllSelected(): boolean;
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(): void;
    isOneSelected(): boolean;
    batchEdit(): void;
    getName(row: any, field: string): void;
}
