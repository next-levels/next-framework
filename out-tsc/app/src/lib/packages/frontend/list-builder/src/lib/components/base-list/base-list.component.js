"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const core_2 = require("@ngx-translate/core");
const router_1 = require("@angular/router");
const collections_1 = require("@angular/cdk/collections");
const dialog_1 = require("@angular/material/dialog");
const list_helper_1 = require("../../helpers/list.helper");
const ListController_1 = require("../../controllers/ListController");
const src_1 = require("../../../../../../shared/generics/src");
const src_2 = require("../../../../../dynamic-modals/src");
let BaseListComponent = class BaseListComponent {
    constructor(translateService, router, _matDialog, cdRef) {
        this.translateService = translateService;
        this.router = router;
        this._matDialog = _matDialog;
        this.cdRef = cdRef;
        this.rowClick = new core_1.EventEmitter();
        this.rowDelete = new core_1.EventEmitter();
        this.rowExport = new core_1.EventEmitter();
        this.rowCreate = new core_1.EventEmitter();
        this.data = [];
        this.displayedColumns = [];
        this.fields = [];
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 20,
            totalPages: 0,
            totalItems: 0,
            sortBy: [['id', 'DESC']],
        };
        this.selection = new collections_1.SelectionModel(true, []);
        this._unsubscribeAll = new rxjs_1.Subject();
        this.filterOptions = (0, list_helper_1.getFilterOptions)(this.pagination);
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
        this.modelFacade?.base.filtered$.subscribe((insurers) => {
            this.data = insurers;
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
    }
    ngAfterViewInit() {
        this.cdRef.detectChanges();
    }
    getSettingsField(field) {
        return Reflect.getMetadata(src_1.LISTFIELD_PREFIX, this.listController.getModelDefinition(), field);
    }
    selectRow(row) {
        this.rowClick.emit(row);
    }
    onDelete(data) {
        this.rowDelete.emit(data);
    }
    onCreate() {
        this.rowCreate.emit();
    }
    openExport() {
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
    trackByFn(index, item) {
        return item.id || index;
    }
    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
};
exports.BaseListComponent = BaseListComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", ListController_1.ListController)
], BaseListComponent.prototype, "listController", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseListComponent.prototype, "rowClick", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseListComponent.prototype, "rowDelete", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseListComponent.prototype, "rowExport", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseListComponent.prototype, "rowCreate", void 0);
exports.BaseListComponent = BaseListComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        template: '<ng-container></ng-container>',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [core_2.TranslateService,
        router_1.ActivatedRoute,
        dialog_1.MatDialog,
        core_1.ChangeDetectorRef])
], BaseListComponent);
//# sourceMappingURL=base-list.component.js.map