"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTableDefaultComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const paginator_1 = require("@angular/material/paginator");
const sort_1 = require("@angular/material/sort");
const forms_1 = require("@angular/forms");
const table_1 = require("@angular/material/table");
const core_2 = require("@ngx-translate/core");
const router_1 = require("@angular/router");
const collections_1 = require("@angular/cdk/collections");
const dialog_1 = require("@angular/material/dialog");
const sweetalert2_1 = require("sweetalert2");
const view_modal_component_1 = require("../view-modal/view-modal.component");
const ListController_1 = require("../../controllers/ListController");
const src_1 = require("../../../../../../shared/generics/src");
const src_2 = require("../../../../../dynamic-modals/src");
let BaseTableDefaultComponent = class BaseTableDefaultComponent {
    constructor(translateService, activeRoute, router, _matDialog, componentFactoryResolver, cdRef) {
        this.translateService = translateService;
        this.activeRoute = activeRoute;
        this.router = router;
        this._matDialog = _matDialog;
        this.componentFactoryResolver = componentFactoryResolver;
        this.cdRef = cdRef;
        this.showHeader = false;
        this.showSearch = true;
        this.detailModal = false;
        this.route = '';
        this.childTable = false;
        this.rowClick = new core_1.EventEmitter();
        this.rowDelete = new core_1.EventEmitter();
        this.rowExport = new core_1.EventEmitter();
        this.rowCreate = new core_1.EventEmitter();
        this.getQueryRowsView = new core_1.EventEmitter();
        this.saveSearchQuery = new core_1.EventEmitter();
        this._unsubscribeAll = new rxjs_1.Subject();
        this.searchInputControl = new forms_1.FormControl(null);
        this.statusFilterControl = new forms_1.FormControl('');
        this.displayedColumns = [];
        this.fields = [];
        this.dataSource = new table_1.MatTableDataSource([]);
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 20,
            totalPages: 0,
            totalItems: 0,
            sortBy: [['id', 'DESC']],
        };
        this.filterOptions = {
            page: this.pagination.currentPage,
            limit: this.pagination.itemsPerPage,
            sortBy: `${this.pagination.sortBy[0][0]}:${this.pagination.sortBy[0][1].toUpperCase()}`,
            search: '',
        };
        this.selection = new collections_1.SelectionModel(true, []);
    }
    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params) => {
            if (params['search']) {
                this.filterOptions.search = params['search'];
            }
        });
        this.modelFacade = this.listController.getFacade();
        this.model = this.listController.getModelDefinition();
        this.modelFacade?.notification?.updated$?.subscribe((timestamp) => {
            console.log('ModelFacade Timestamp:', timestamp);
        });
        const listFields = Reflect.getMetadata(src_1.LISTFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
        const builderFields = Reflect.getMetadata(src_1.BUILDERFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
        this.fields = [...builderFields, ...listFields];
        if (this.fields) {
            this.displayedColumns.push('select');
            this.displayedColumns = [...this.displayedColumns, ...this.fields];
            this.displayedColumns.push('actions');
        }
        if (this.listController.scope.length > 0) {
            this.listController.scope.forEach((scope) => {
                this.filterOptions['filter.' + scope.key] =
                    scope.operation + ':' + scope.value;
            });
        }
        this.modelFacade?.base.filtered$.subscribe((entries) => {
            this.dataSource.data = entries.sort((a, b) => {
                return b.id - a.id;
            });
            this.cdRef.detectChanges();
        });
        this.modelFacade?.base.pagination$.subscribe((paginationMeta) => {
            if (paginationMeta) {
                this.pagination = paginationMeta;
            }
        });
        if (this.modelFacade) {
            this.modelFacade.base.loadFiltered(this.filterOptions);
            this.loading$ = this.modelFacade.base.loaded$;
        }
        this.searchInputControl.valueChanges
            .pipe((0, rxjs_1.takeUntil)(this._unsubscribeAll), (0, rxjs_1.debounceTime)(300), (0, rxjs_1.tap)((search) => {
            this.filterOptions = { ...this.filterOptions, search };
            if (this.modelFacade) {
                this.modelFacade.base.loadFiltered(this.filterOptions);
            }
        }))
            .subscribe();
    }
    ngOnChanges(changes) {
        if (changes.selector) {
            if (this.modelFacade?.selectors[changes.selector.currentValue]) {
                const observable = this.modelFacade.selectors[changes.selector.currentValue];
                observable.subscribe((entries) => {
                    console.log(entries);
                    this.dataSource.data = entries.sort((a, b) => {
                        return b.id - a.id;
                    });
                    this.cdRef.detectChanges();
                });
            }
            console.log('selector changed:', changes.selector.currentValue);
        }
    }
    ngAfterViewInit() {
        if (this.sort && this.paginator) {
            this.sort.sortChange.subscribe(() => {
                this.paginator.pageIndex = 0;
            });
            (0, rxjs_1.merge)(this.sort.sortChange, this.paginator.page)
                .pipe((0, rxjs_1.takeUntil)(this._unsubscribeAll), (0, rxjs_1.tap)(() => {
                this.filterOptions = {
                    ...this.filterOptions,
                    page: this.paginator.pageIndex + 1,
                    limit: this.paginator.pageSize,
                    sortBy: `${this.sort.active}:${this.sort.direction.toUpperCase()}`,
                };
                if (this.modelFacade) {
                    this.modelFacade.base.loadFiltered(this.filterOptions);
                }
            }))
                .subscribe();
        }
        this.cdRef.detectChanges();
    }
    getTimestamp(value) {
        return new Date(value).getTime();
    }
    selectRow(row) {
        if (this.detailModal) {
            this._matDialog.open(src_2.CreateWizardComponent, {
                minWidth: '50%',
                autoFocus: false,
                data: {
                    model: this.model,
                    edit: true,
                    values: row,
                    modelFacade: this.modelFacade,
                    scope: this.listController.scope,
                },
            });
            this.cdRef.detectChanges();
        }
        else {
            if (this.route !== '') {
                this.router.navigate([this.route + '/' + row.id]);
            }
        }
    }
    delete(data) {
        let name = '';
        this.translateService.get('test').subscribe((translated) => {
            const labelCode = src_1.META.getNameByModel(this.listController.getModelDefinition()) + '.name';
            name = this.translateService.instant(labelCode);
        });
        sweetalert2_1.default.fire({
            text: 'Sind Sie sich sicher, dass Sie den ' + name + ' löschen möchten?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Nein, abbrechen',
        }).then((result) => {
            if (result.value) {
                this.modelFacade.base.delete(data);
            }
            else if (result.isDismissed) {
            }
        });
    }
    openAddInsurersModal() {
        this.rowCreate.emit();
    }
    openExportInsurersModal() {
        this.rowExport.emit();
    }
    openAddModal() {
        this._matDialog.open(src_2.CreateWizardComponent, {
            minWidth: '50%',
            autoFocus: false,
            data: {
                model: this.model,
                modelFacade: this.modelFacade,
                scope: this.listController.scope,
            },
        });
        this.cdRef.detectChanges();
    }
    export() {
        const listFields = Reflect.getMetadata(src_1.LISTFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
        const builderFields = Reflect.getMetadata(src_1.BUILDERFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
        const exportFields = Reflect.getMetadata(src_1.EXPORT_PREFIX_ALL, this.listController.getModelDefinition()) || [];
        let fields = [...builderFields, ...listFields, ...exportFields];
        fields = fields.map((field) => {
            let options = Reflect.getMetadata(src_1.EXPORT_PREFIX, this.listController.getModelDefinition(), field) || {};
            return { field, options };
        });
        //filter out fields that have options.hidden set to true and return only the field names
        let headerFields = fields.filter((field) => {
            return field.options.hidden !== true;
        });
        let csvData = this.ConvertToCSV(this.dataSource.data, headerFields);
        let blob = new Blob(['\ufeff' + csvData], {
            type: 'text/csv;charset=utf-8;',
        });
        let dwldLink = document.createElement('a');
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 &&
            navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {
            //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute('target', '_blank');
        }
        dwldLink.setAttribute('href', url);
        let name = '';
        this.translateService.get('test').subscribe((translated) => {
            const labelCode = src_1.META.getNameByModel(this.listController.getModelDefinition()) + '.name';
            name = this.translateService.instant(labelCode);
        });
        dwldLink.setAttribute('download', name + '_export_' + new Date().toDateString() + '.csv');
        dwldLink.style.visibility = 'hidden';
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray, headerList) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'S.No,';
        for (let index in headerList) {
            let name = '';
            this.translateService.get('test').subscribe((translated) => {
                let field = headerList[index].options.selector ?? headerList[index].field;
                let labelCode = '';
                if (field.includes('.')) {
                    labelCode =
                        field.split('.')[0] + '.properties.' + field.split('.')[1];
                }
                else {
                    labelCode =
                        src_1.META.getNameByModel(this.listController.getModelDefinition()) +
                            '.properties.' +
                            field;
                }
                name = this.translateService.instant(labelCode);
            });
            row += name + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = i + 1 + '';
            for (let index in headerList) {
                let head = headerList[index].options?.selector || headerList[index].field;
                let value = '';
                if (head.includes('.')) {
                    let split = head.split('.');
                    let orgValue = array[i];
                    value = orgValue[split[0]][split[1]];
                    line += ',' + value;
                }
                else {
                    line += ',' + array[i][head];
                }
            }
            str += line + '\r\n';
        }
        return str;
    }
    openViewModal(row) {
        if (this.detailModal) {
            this._matDialog.open(view_modal_component_1.ViewModalComponent, {
                minWidth: '50%',
                autoFocus: false,
                data: {
                    model: this.model,
                    modelFacade: this.modelFacade,
                    values: row,
                },
            });
            this.cdRef.detectChanges();
        }
        else {
            if (this.route !== '') {
                this.router.navigate([this.route + '/' + row.id]);
            }
        }
    }
    trackByFn(index, item) {
        return item.id || index;
    }
    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    setQuery(filterOptions) {
        let value, arr;
        const filters = { ...this.filterOptions };
        for (const filterOption of filterOptions) {
            value = filterOption.expression ? filterOption.expression + ':' : '';
            value += filterOption.operation + ':' + filterOption.value;
            if (filters['filter.' + filterOption.key]) {
                arr = [];
                arr.push(filters['filter.' + filterOption.key]);
                arr.push(value);
                filters['filter.' + filterOption.key] = arr;
            }
            else {
                filters['filter.' + filterOption.key] = value;
            }
        }
        this.modelFacade?.base.loadFiltered(filters);
    }
    addSearchQueryCall(event) {
        this.saveSearchQuery.emit(event);
    }
    openSelectSearchQueryModal(event) {
        this.getQueryRowsView.emit();
    }
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
    isOneSelected() {
        const numSelected = this.selection.selected.length;
        return numSelected > 0;
    }
    batchEdit() { }
    getName(row, field) { }
};
exports.BaseTableDefaultComponent = BaseTableDefaultComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", ListController_1.ListController)
], BaseTableDefaultComponent.prototype, "listController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "showHeader", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "showSearch", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], BaseTableDefaultComponent.prototype, "selector", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "detailModal", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "route", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "childTable", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "searchQuery", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "rowClick", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "rowDelete", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "rowExport", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "rowCreate", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "getQueryRowsView", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseTableDefaultComponent.prototype, "saveSearchQuery", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)(paginator_1.MatPaginator),
    tslib_1.__metadata("design:type", paginator_1.MatPaginator)
], BaseTableDefaultComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)(sort_1.MatSort),
    tslib_1.__metadata("design:type", sort_1.MatSort)
], BaseTableDefaultComponent.prototype, "sort", void 0);
exports.BaseTableDefaultComponent = BaseTableDefaultComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        template: '<ng-container></ng-container>',
        styleUrls: ['./base-table.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [core_2.TranslateService,
        router_1.ActivatedRoute,
        router_1.Router,
        dialog_1.MatDialog,
        core_1.ComponentFactoryResolver,
        core_1.ChangeDetectorRef])
], BaseTableDefaultComponent);
//# sourceMappingURL=base-table-default.component.js.map