"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableSubmoduleComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const paginator_1 = require("@angular/material/paginator");
const sort_1 = require("@angular/material/sort");
const forms_1 = require("@angular/forms");
const table_1 = require("@angular/material/table");
const store_1 = require("@ngrx/store");
const core_2 = require("@ngx-translate/core");
const router_1 = require("@angular/router");
const ListController_1 = require("../../controllers/ListController");
const public_api_1 = require("../../../../../generic-store/public_api");
const src_1 = require("../../../../../../shared/generics/src");
let TableSubmoduleComponent = class TableSubmoduleComponent {
    constructor(translateService, store, router) {
        this.translateService = translateService;
        this.store = store;
        this.router = router;
        this.showHeader = true;
        this._unsubscribeAll = new rxjs_1.Subject();
        this.searchInputControl = new forms_1.FormControl(null);
        this.displayedColumns = [];
        this.fields = [];
        this.dataSource = new table_1.MatTableDataSource([]);
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 5,
            totalPages: 0,
            totalItems: 0,
            sortBy: [['id', 'ASC']],
        };
        this.filterOptions = {
            page: this.pagination.currentPage,
            limit: this.pagination.itemsPerPage,
            sortBy: `${this.pagination.sortBy[0][0]}:${this.pagination.sortBy[0][1].toUpperCase()}`,
            search: '',
        };
    }
    ngOnInit() {
        this.router.queryParams.subscribe((params) => {
            if (params['search']) {
                this.filterOptions.search = params['search'];
            }
        });
        this.modelFacade = this.listController.getFacade();
        this.model = this.listController.getModelDefinition();
        this.fields = Reflect.getMetadata(src_1.LISTFIELD_ALL_PREFIX, this.listController.getModelDefinition());
        if (this.fields) {
            this.displayedColumns = [...this.fields];
            this.displayedColumns.push('actions');
        }
        if (this.listController.scope.length > 0) {
            this.listController.scope.forEach((scope) => {
                this.filterOptions['filter.' + scope.key] =
                    scope.operation + ':' + scope.value;
            });
        }
        this.modelFacade?.base.filtered$.subscribe((dataList) => {
            this.dataSource.data = dataList;
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
    }
    getSettingsField(field) {
        return Reflect.getMetadata(src_1.LISTFIELD_PREFIX, this.listController.getModelDefinition(), field);
    }
    selectRow(row) { }
    onDelete(data) { }
    openAddModal() { }
    trackByFn(index, item) {
        return item.id || index;
    }
    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
};
exports.TableSubmoduleComponent = TableSubmoduleComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", ListController_1.ListController)
], TableSubmoduleComponent.prototype, "listController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], TableSubmoduleComponent.prototype, "showHeader", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", public_api_1.StoreFacade)
], TableSubmoduleComponent.prototype, "facade", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], TableSubmoduleComponent.prototype, "modelDefinition", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], TableSubmoduleComponent.prototype, "scope", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)(paginator_1.MatPaginator),
    tslib_1.__metadata("design:type", paginator_1.MatPaginator)
], TableSubmoduleComponent.prototype, "paginator", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)(sort_1.MatSort),
    tslib_1.__metadata("design:type", sort_1.MatSort)
], TableSubmoduleComponent.prototype, "sort", void 0);
exports.TableSubmoduleComponent = TableSubmoduleComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'table-submodule',
        templateUrl: './table-submodule.component.html',
    }),
    tslib_1.__metadata("design:paramtypes", [core_2.TranslateService,
        store_1.Store,
        router_1.ActivatedRoute])
], TableSubmoduleComponent);
//# sourceMappingURL=table-submodule.component.js.map