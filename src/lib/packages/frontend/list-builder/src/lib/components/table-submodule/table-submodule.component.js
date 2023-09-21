"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.TableSubmoduleComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/material/table");
var src_1 = require("../../../../../../shared/generics/src");
var TableSubmoduleComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'table-submodule',
            templateUrl: './table-submodule.component.html',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _listController_decorators;
    var _listController_initializers = [];
    var _showHeader_decorators;
    var _showHeader_initializers = [];
    var _facade_decorators;
    var _facade_initializers = [];
    var _modelDefinition_decorators;
    var _modelDefinition_initializers = [];
    var _scope_decorators;
    var _scope_initializers = [];
    var _paginator_decorators;
    var _paginator_initializers = [];
    var _sort_decorators;
    var _sort_initializers = [];
    var TableSubmoduleComponent = _classThis = /** @class */ (function () {
        function TableSubmoduleComponent_1(translateService, store, router) {
            this.translateService = (__runInitializers(this, _instanceExtraInitializers), translateService);
            this.store = store;
            this.router = router;
            this.listController = __runInitializers(this, _listController_initializers, void 0);
            this.showHeader = __runInitializers(this, _showHeader_initializers, true);
            this.facade = __runInitializers(this, _facade_initializers, void 0);
            this.modelDefinition = __runInitializers(this, _modelDefinition_initializers, void 0);
            this.scope = __runInitializers(this, _scope_initializers, void 0);
            this.paginator = __runInitializers(this, _paginator_initializers, void 0);
            this.sort = __runInitializers(this, _sort_initializers, void 0);
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
                sortBy: "".concat(this.pagination.sortBy[0][0], ":").concat(this.pagination.sortBy[0][1].toUpperCase()),
                search: '',
            };
        }
        TableSubmoduleComponent_1.prototype.ngOnInit = function () {
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
                this.displayedColumns = __spreadArray([], this.fields, true);
                this.displayedColumns.push('actions');
            }
            if (this.listController.scope.length > 0) {
                this.listController.scope.forEach(function (scope) {
                    _this.filterOptions['filter.' + scope.key] =
                        scope.operation + ':' + scope.value;
                });
            }
            (_a = this.modelFacade) === null || _a === void 0 ? void 0 : _a.base.filtered$.subscribe(function (dataList) {
                _this.dataSource.data = dataList;
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
            this.searchInputControl.valueChanges
                .pipe((0, rxjs_1.takeUntil)(this._unsubscribeAll), (0, rxjs_1.debounceTime)(300), (0, rxjs_1.tap)(function (search) {
                _this.filterOptions = __assign(__assign({}, _this.filterOptions), { search: search });
                if (_this.modelFacade) {
                    _this.modelFacade.base.loadFiltered(_this.filterOptions);
                }
            }))
                .subscribe();
        };
        TableSubmoduleComponent_1.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.sort && this.paginator) {
                this.sort.sortChange.subscribe(function () {
                    _this.paginator.pageIndex = 0;
                });
                (0, rxjs_1.merge)(this.sort.sortChange, this.paginator.page)
                    .pipe((0, rxjs_1.takeUntil)(this._unsubscribeAll), (0, rxjs_1.tap)(function () {
                    _this.filterOptions = __assign(__assign({}, _this.filterOptions), { page: _this.paginator.pageIndex + 1, limit: _this.paginator.pageSize, sortBy: "".concat(_this.sort.active, ":").concat(_this.sort.direction.toUpperCase()) });
                    if (_this.modelFacade) {
                        _this.modelFacade.base.loadFiltered(_this.filterOptions);
                    }
                }))
                    .subscribe();
            }
        };
        TableSubmoduleComponent_1.prototype.getSettingsField = function (field) {
            return Reflect.getMetadata(src_1.LISTFIELD_PREFIX, this.listController.getModelDefinition(), field);
        };
        TableSubmoduleComponent_1.prototype.selectRow = function (row) { };
        TableSubmoduleComponent_1.prototype.onDelete = function (data) { };
        TableSubmoduleComponent_1.prototype.openAddModal = function () { };
        TableSubmoduleComponent_1.prototype.trackByFn = function (index, item) {
            return item.id || index;
        };
        TableSubmoduleComponent_1.prototype.ngOnDestroy = function () {
            this._unsubscribeAll.next(null);
            this._unsubscribeAll.complete();
        };
        return TableSubmoduleComponent_1;
    }());
    __setFunctionName(_classThis, "TableSubmoduleComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listController_decorators = [(0, core_1.Input)()];
        _showHeader_decorators = [(0, core_1.Input)()];
        _facade_decorators = [(0, core_1.Input)()];
        _modelDefinition_decorators = [(0, core_1.Input)()];
        _scope_decorators = [(0, core_1.Input)()];
        _paginator_decorators = [(0, core_1.ViewChild)(paginator_1.MatPaginator)];
        _sort_decorators = [(0, core_1.ViewChild)(sort_1.MatSort)];
        __esDecorate(null, null, _listController_decorators, { kind: "field", name: "listController", static: false, private: false, access: { has: function (obj) { return "listController" in obj; }, get: function (obj) { return obj.listController; }, set: function (obj, value) { obj.listController = value; } }, metadata: _metadata }, _listController_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _showHeader_decorators, { kind: "field", name: "showHeader", static: false, private: false, access: { has: function (obj) { return "showHeader" in obj; }, get: function (obj) { return obj.showHeader; }, set: function (obj, value) { obj.showHeader = value; } }, metadata: _metadata }, _showHeader_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _facade_decorators, { kind: "field", name: "facade", static: false, private: false, access: { has: function (obj) { return "facade" in obj; }, get: function (obj) { return obj.facade; }, set: function (obj, value) { obj.facade = value; } }, metadata: _metadata }, _facade_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modelDefinition_decorators, { kind: "field", name: "modelDefinition", static: false, private: false, access: { has: function (obj) { return "modelDefinition" in obj; }, get: function (obj) { return obj.modelDefinition; }, set: function (obj, value) { obj.modelDefinition = value; } }, metadata: _metadata }, _modelDefinition_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _scope_decorators, { kind: "field", name: "scope", static: false, private: false, access: { has: function (obj) { return "scope" in obj; }, get: function (obj) { return obj.scope; }, set: function (obj, value) { obj.scope = value; } }, metadata: _metadata }, _scope_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _paginator_decorators, { kind: "field", name: "paginator", static: false, private: false, access: { has: function (obj) { return "paginator" in obj; }, get: function (obj) { return obj.paginator; }, set: function (obj, value) { obj.paginator = value; } }, metadata: _metadata }, _paginator_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _sort_decorators, { kind: "field", name: "sort", static: false, private: false, access: { has: function (obj) { return "sort" in obj; }, get: function (obj) { return obj.sort; }, set: function (obj, value) { obj.sort = value; } }, metadata: _metadata }, _sort_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TableSubmoduleComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TableSubmoduleComponent = _classThis;
}();
exports.TableSubmoduleComponent = TableSubmoduleComponent;
