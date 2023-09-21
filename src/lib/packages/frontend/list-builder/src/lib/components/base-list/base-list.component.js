"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseListComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var collections_1 = require("@angular/cdk/collections");
var list_helper_1 = require("../../helpers/list.helper");
var src_1 = require("../../../../../../shared/generics/src");
var src_2 = require("../../../../../dynamic-modals/src");
var BaseListComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            template: '<ng-container></ng-container>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _listController_decorators;
    var _listController_initializers = [];
    var _rowClick_decorators;
    var _rowClick_initializers = [];
    var _rowDelete_decorators;
    var _rowDelete_initializers = [];
    var _rowExport_decorators;
    var _rowExport_initializers = [];
    var _rowCreate_decorators;
    var _rowCreate_initializers = [];
    var BaseListComponent = _classThis = /** @class */ (function () {
        function BaseListComponent_1(translateService, router, _matDialog, cdRef) {
            this.translateService = (__runInitializers(this, _instanceExtraInitializers), translateService);
            this.router = router;
            this._matDialog = _matDialog;
            this.cdRef = cdRef;
            this.listController = __runInitializers(this, _listController_initializers, void 0);
            this.rowClick = __runInitializers(this, _rowClick_initializers, new core_1.EventEmitter());
            this.rowDelete = __runInitializers(this, _rowDelete_initializers, new core_1.EventEmitter());
            this.rowExport = __runInitializers(this, _rowExport_initializers, new core_1.EventEmitter());
            this.rowCreate = __runInitializers(this, _rowCreate_initializers, new core_1.EventEmitter());
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
        BaseListComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b;
            this.router.queryParams.subscribe(function (params) {
                if (params['search']) {
                    _this.filterOptions.search = params['search'];
                }
            });
            this.modelFacade = this.listController.getFacade();
            this.model = this.listController.getModelDefinition();
            this.fields = Reflect.getMetadata(src_1.LISTFIELD_ALL_PREFIX, this.listController.getModelDefinition());
            if (this.fields) {
                this.displayedColumns.push('select');
                this.displayedColumns = __spreadArray(__spreadArray([], this.displayedColumns, true), this.fields, true);
                this.displayedColumns.push('actions');
            }
            if (this.listController.scope.length > 0) {
                this.listController.scope.forEach(function (scope) {
                    _this.filterOptions['filter.' + scope.key] =
                        scope.operation + ':' + scope.value;
                });
            }
            (_a = this.modelFacade) === null || _a === void 0 ? void 0 : _a.base.filtered$.subscribe(function (insurers) {
                _this.data = insurers;
            });
            (_b = this.modelFacade) === null || _b === void 0 ? void 0 : _b.base.pagination$.subscribe(function (paginationMeta) {
                if (paginationMeta) {
                    _this.pagination = paginationMeta;
                }
            });
            if (this.modelFacade) {
                this.modelFacade.base.loadFiltered(this.filterOptions);
                this.loading$ = this.modelFacade.base.loaded$;
            }
        };
        BaseListComponent_1.prototype.ngAfterViewInit = function () {
            this.cdRef.detectChanges();
        };
        BaseListComponent_1.prototype.getSettingsField = function (field) {
            return Reflect.getMetadata(src_1.LISTFIELD_PREFIX, this.listController.getModelDefinition(), field);
        };
        BaseListComponent_1.prototype.selectRow = function (row) {
            this.rowClick.emit(row);
        };
        BaseListComponent_1.prototype.onDelete = function (data) {
            this.rowDelete.emit(data);
        };
        BaseListComponent_1.prototype.onCreate = function () {
            this.rowCreate.emit();
        };
        BaseListComponent_1.prototype.openExport = function () {
            this.rowExport.emit();
        };
        BaseListComponent_1.prototype.openAddModal = function () {
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
        };
        BaseListComponent_1.prototype.trackByFn = function (index, item) {
            return item.id || index;
        };
        BaseListComponent_1.prototype.ngOnDestroy = function () {
            this._unsubscribeAll.next(null);
            this._unsubscribeAll.complete();
        };
        return BaseListComponent_1;
    }());
    __setFunctionName(_classThis, "BaseListComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listController_decorators = [(0, core_1.Input)()];
        _rowClick_decorators = [(0, core_1.Output)()];
        _rowDelete_decorators = [(0, core_1.Output)()];
        _rowExport_decorators = [(0, core_1.Output)()];
        _rowCreate_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _listController_decorators, { kind: "field", name: "listController", static: false, private: false, access: { has: function (obj) { return "listController" in obj; }, get: function (obj) { return obj.listController; }, set: function (obj, value) { obj.listController = value; } }, metadata: _metadata }, _listController_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowClick_decorators, { kind: "field", name: "rowClick", static: false, private: false, access: { has: function (obj) { return "rowClick" in obj; }, get: function (obj) { return obj.rowClick; }, set: function (obj, value) { obj.rowClick = value; } }, metadata: _metadata }, _rowClick_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowDelete_decorators, { kind: "field", name: "rowDelete", static: false, private: false, access: { has: function (obj) { return "rowDelete" in obj; }, get: function (obj) { return obj.rowDelete; }, set: function (obj, value) { obj.rowDelete = value; } }, metadata: _metadata }, _rowDelete_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowExport_decorators, { kind: "field", name: "rowExport", static: false, private: false, access: { has: function (obj) { return "rowExport" in obj; }, get: function (obj) { return obj.rowExport; }, set: function (obj, value) { obj.rowExport = value; } }, metadata: _metadata }, _rowExport_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowCreate_decorators, { kind: "field", name: "rowCreate", static: false, private: false, access: { has: function (obj) { return "rowCreate" in obj; }, get: function (obj) { return obj.rowCreate; }, set: function (obj, value) { obj.rowCreate = value; } }, metadata: _metadata }, _rowCreate_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BaseListComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BaseListComponent = _classThis;
}();
exports.BaseListComponent = BaseListComponent;
