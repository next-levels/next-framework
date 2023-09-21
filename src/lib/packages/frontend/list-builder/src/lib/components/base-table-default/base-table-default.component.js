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
exports.BaseTableDefaultComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var paginator_1 = require("@angular/material/paginator");
var sort_1 = require("@angular/material/sort");
var forms_1 = require("@angular/forms");
var table_1 = require("@angular/material/table");
var collections_1 = require("@angular/cdk/collections");
var sweetalert2_1 = require("sweetalert2");
var view_modal_component_1 = require("../view-modal/view-modal.component");
var src_1 = require("../../../../../../shared/generics/src");
var src_2 = require("../../../../../dynamic-modals/src");
var BaseTableDefaultComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            template: '<ng-container></ng-container>',
            styleUrls: ['./base-table.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _listController_decorators;
    var _listController_initializers = [];
    var _showHeader_decorators;
    var _showHeader_initializers = [];
    var _showSearch_decorators;
    var _showSearch_initializers = [];
    var _selector_decorators;
    var _selector_initializers = [];
    var _detailModal_decorators;
    var _detailModal_initializers = [];
    var _route_decorators;
    var _route_initializers = [];
    var _childTable_decorators;
    var _childTable_initializers = [];
    var _searchQuery_decorators;
    var _searchQuery_initializers = [];
    var _rowClick_decorators;
    var _rowClick_initializers = [];
    var _rowDelete_decorators;
    var _rowDelete_initializers = [];
    var _rowExport_decorators;
    var _rowExport_initializers = [];
    var _rowCreate_decorators;
    var _rowCreate_initializers = [];
    var _getQueryRowsView_decorators;
    var _getQueryRowsView_initializers = [];
    var _saveSearchQuery_decorators;
    var _saveSearchQuery_initializers = [];
    var _paginator_decorators;
    var _paginator_initializers = [];
    var _sort_decorators;
    var _sort_initializers = [];
    var BaseTableDefaultComponent = _classThis = /** @class */ (function () {
        function BaseTableDefaultComponent_1(translateService, activeRoute, router, _matDialog, componentFactoryResolver, cdRef) {
            this.translateService = (__runInitializers(this, _instanceExtraInitializers), translateService);
            this.activeRoute = activeRoute;
            this.router = router;
            this._matDialog = _matDialog;
            this.componentFactoryResolver = componentFactoryResolver;
            this.cdRef = cdRef;
            this.listController = __runInitializers(this, _listController_initializers, void 0);
            this.showHeader = __runInitializers(this, _showHeader_initializers, false);
            this.showSearch = __runInitializers(this, _showSearch_initializers, true);
            this.selector = __runInitializers(this, _selector_initializers, void 0);
            this.detailModal = __runInitializers(this, _detailModal_initializers, false);
            this.route = __runInitializers(this, _route_initializers, '');
            this.childTable = __runInitializers(this, _childTable_initializers, false);
            this.searchQuery = __runInitializers(this, _searchQuery_initializers, void 0);
            this.rowClick = __runInitializers(this, _rowClick_initializers, new core_1.EventEmitter());
            this.rowDelete = __runInitializers(this, _rowDelete_initializers, new core_1.EventEmitter());
            this.rowExport = __runInitializers(this, _rowExport_initializers, new core_1.EventEmitter());
            this.rowCreate = __runInitializers(this, _rowCreate_initializers, new core_1.EventEmitter());
            this.getQueryRowsView = __runInitializers(this, _getQueryRowsView_initializers, new core_1.EventEmitter());
            this.saveSearchQuery = __runInitializers(this, _saveSearchQuery_initializers, new core_1.EventEmitter());
            this.paginator = __runInitializers(this, _paginator_initializers, void 0);
            this.sort = __runInitializers(this, _sort_initializers, void 0);
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
                sortBy: "".concat(this.pagination.sortBy[0][0], ":").concat(this.pagination.sortBy[0][1].toUpperCase()),
                search: '',
            };
            this.selection = new collections_1.SelectionModel(true, []);
        }
        BaseTableDefaultComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b, _c, _d, _e;
            this.activeRoute.queryParams.subscribe(function (params) {
                if (params['search']) {
                    _this.filterOptions.search = params['search'];
                }
            });
            this.modelFacade = this.listController.getFacade();
            this.model = this.listController.getModelDefinition();
            (_c = (_b = (_a = this.modelFacade) === null || _a === void 0 ? void 0 : _a.notification) === null || _b === void 0 ? void 0 : _b.updated$) === null || _c === void 0 ? void 0 : _c.subscribe(function (timestamp) {
                console.log('ModelFacade Timestamp:', timestamp);
            });
            var listFields = Reflect.getMetadata(src_1.LISTFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
            var builderFields = Reflect.getMetadata(src_1.BUILDERFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
            this.fields = __spreadArray(__spreadArray([], builderFields, true), listFields, true);
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
            (_d = this.modelFacade) === null || _d === void 0 ? void 0 : _d.base.filtered$.subscribe(function (entries) {
                _this.dataSource.data = entries.sort(function (a, b) {
                    return b.id - a.id;
                });
                _this.cdRef.detectChanges();
            });
            (_e = this.modelFacade) === null || _e === void 0 ? void 0 : _e.base.pagination$.subscribe(function (paginationMeta) {
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
        BaseTableDefaultComponent_1.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var _a;
            if (changes.selector) {
                if ((_a = this.modelFacade) === null || _a === void 0 ? void 0 : _a.selectors[changes.selector.currentValue]) {
                    var observable = this.modelFacade.selectors[changes.selector.currentValue];
                    observable.subscribe(function (entries) {
                        console.log(entries);
                        _this.dataSource.data = entries.sort(function (a, b) {
                            return b.id - a.id;
                        });
                        _this.cdRef.detectChanges();
                    });
                }
                console.log('selector changed:', changes.selector.currentValue);
            }
        };
        BaseTableDefaultComponent_1.prototype.ngAfterViewInit = function () {
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
            this.cdRef.detectChanges();
        };
        BaseTableDefaultComponent_1.prototype.getTimestamp = function (value) {
            return new Date(value).getTime();
        };
        BaseTableDefaultComponent_1.prototype.selectRow = function (row) {
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
        };
        BaseTableDefaultComponent_1.prototype.delete = function (data) {
            var _this = this;
            var name = '';
            this.translateService.get('test').subscribe(function (translated) {
                var labelCode = src_1.META.getNameByModel(_this.listController.getModelDefinition()) + '.name';
                name = _this.translateService.instant(labelCode);
            });
            sweetalert2_1.default.fire({
                text: 'Sind Sie sich sicher, dass Sie den ' + name + ' löschen möchten?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Ja, löschen!',
                cancelButtonText: 'Nein, abbrechen',
            }).then(function (result) {
                if (result.value) {
                    _this.modelFacade.base.delete(data);
                }
                else if (result.isDismissed) {
                }
            });
        };
        BaseTableDefaultComponent_1.prototype.openAddInsurersModal = function () {
            this.rowCreate.emit();
        };
        BaseTableDefaultComponent_1.prototype.openExportInsurersModal = function () {
            this.rowExport.emit();
        };
        BaseTableDefaultComponent_1.prototype.openAddModal = function () {
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
        BaseTableDefaultComponent_1.prototype.export = function () {
            var _this = this;
            var listFields = Reflect.getMetadata(src_1.LISTFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
            var builderFields = Reflect.getMetadata(src_1.BUILDERFIELD_ALL_PREFIX, this.listController.getModelDefinition()) || [];
            var exportFields = Reflect.getMetadata(src_1.EXPORT_PREFIX_ALL, this.listController.getModelDefinition()) || [];
            var fields = __spreadArray(__spreadArray(__spreadArray([], builderFields, true), listFields, true), exportFields, true);
            fields = fields.map(function (field) {
                var options = Reflect.getMetadata(src_1.EXPORT_PREFIX, _this.listController.getModelDefinition(), field) || {};
                return { field: field, options: options };
            });
            //filter out fields that have options.hidden set to true and return only the field names
            var headerFields = fields.filter(function (field) {
                return field.options.hidden !== true;
            });
            var csvData = this.ConvertToCSV(this.dataSource.data, headerFields);
            var blob = new Blob(['\ufeff' + csvData], {
                type: 'text/csv;charset=utf-8;',
            });
            var dwldLink = document.createElement('a');
            var url = URL.createObjectURL(blob);
            var isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 &&
                navigator.userAgent.indexOf('Chrome') == -1;
            if (isSafariBrowser) {
                //if Safari open in new window to save file with random filename.
                dwldLink.setAttribute('target', '_blank');
            }
            dwldLink.setAttribute('href', url);
            var name = '';
            this.translateService.get('test').subscribe(function (translated) {
                var labelCode = src_1.META.getNameByModel(_this.listController.getModelDefinition()) + '.name';
                name = _this.translateService.instant(labelCode);
            });
            dwldLink.setAttribute('download', name + '_export_' + new Date().toDateString() + '.csv');
            dwldLink.style.visibility = 'hidden';
            document.body.appendChild(dwldLink);
            dwldLink.click();
            document.body.removeChild(dwldLink);
        };
        BaseTableDefaultComponent_1.prototype.ConvertToCSV = function (objArray, headerList) {
            var _this = this;
            var _a;
            var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var str = '';
            var row = 'S.No,';
            var _loop_1 = function (index) {
                var name_1 = '';
                this_1.translateService.get('test').subscribe(function (translated) {
                    var _a;
                    var field = (_a = headerList[index].options.selector) !== null && _a !== void 0 ? _a : headerList[index].field;
                    var labelCode = '';
                    if (field.includes('.')) {
                        labelCode =
                            field.split('.')[0] + '.properties.' + field.split('.')[1];
                    }
                    else {
                        labelCode =
                            src_1.META.getNameByModel(_this.listController.getModelDefinition()) +
                                '.properties.' +
                                field;
                    }
                    name_1 = _this.translateService.instant(labelCode);
                });
                row += name_1 + ',';
            };
            var this_1 = this;
            for (var index in headerList) {
                _loop_1(index);
            }
            row = row.slice(0, -1);
            str += row + '\r\n';
            for (var i = 0; i < array.length; i++) {
                var line = i + 1 + '';
                for (var index in headerList) {
                    var head = ((_a = headerList[index].options) === null || _a === void 0 ? void 0 : _a.selector) || headerList[index].field;
                    var value = '';
                    if (head.includes('.')) {
                        var split = head.split('.');
                        var orgValue = array[i];
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
        };
        BaseTableDefaultComponent_1.prototype.openViewModal = function (row) {
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
        };
        BaseTableDefaultComponent_1.prototype.trackByFn = function (index, item) {
            return item.id || index;
        };
        BaseTableDefaultComponent_1.prototype.ngOnDestroy = function () {
            this._unsubscribeAll.next(null);
            this._unsubscribeAll.complete();
        };
        BaseTableDefaultComponent_1.prototype.setQuery = function (filterOptions) {
            var _a;
            var value, arr;
            var filters = __assign({}, this.filterOptions);
            for (var _i = 0, filterOptions_1 = filterOptions; _i < filterOptions_1.length; _i++) {
                var filterOption = filterOptions_1[_i];
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
            (_a = this.modelFacade) === null || _a === void 0 ? void 0 : _a.base.loadFiltered(filters);
        };
        BaseTableDefaultComponent_1.prototype.addSearchQueryCall = function (event) {
            this.saveSearchQuery.emit(event);
        };
        BaseTableDefaultComponent_1.prototype.openSelectSearchQueryModal = function (event) {
            this.getQueryRowsView.emit();
        };
        BaseTableDefaultComponent_1.prototype.isAllSelected = function () {
            var numSelected = this.selection.selected.length;
            var numRows = this.dataSource.data.length;
            return numSelected === numRows;
        };
        /** Selects all rows if they are not all selected; otherwise clear selection. */
        BaseTableDefaultComponent_1.prototype.masterToggle = function () {
            var _this = this;
            this.isAllSelected()
                ? this.selection.clear()
                : this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
        };
        BaseTableDefaultComponent_1.prototype.isOneSelected = function () {
            var numSelected = this.selection.selected.length;
            return numSelected > 0;
        };
        BaseTableDefaultComponent_1.prototype.batchEdit = function () { };
        BaseTableDefaultComponent_1.prototype.getName = function (row, field) { };
        return BaseTableDefaultComponent_1;
    }());
    __setFunctionName(_classThis, "BaseTableDefaultComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _listController_decorators = [(0, core_1.Input)()];
        _showHeader_decorators = [(0, core_1.Input)()];
        _showSearch_decorators = [(0, core_1.Input)()];
        _selector_decorators = [(0, core_1.Input)()];
        _detailModal_decorators = [(0, core_1.Input)()];
        _route_decorators = [(0, core_1.Input)()];
        _childTable_decorators = [(0, core_1.Input)()];
        _searchQuery_decorators = [(0, core_1.Input)()];
        _rowClick_decorators = [(0, core_1.Output)()];
        _rowDelete_decorators = [(0, core_1.Output)()];
        _rowExport_decorators = [(0, core_1.Output)()];
        _rowCreate_decorators = [(0, core_1.Output)()];
        _getQueryRowsView_decorators = [(0, core_1.Output)()];
        _saveSearchQuery_decorators = [(0, core_1.Output)()];
        _paginator_decorators = [(0, core_1.ViewChild)(paginator_1.MatPaginator)];
        _sort_decorators = [(0, core_1.ViewChild)(sort_1.MatSort)];
        __esDecorate(null, null, _listController_decorators, { kind: "field", name: "listController", static: false, private: false, access: { has: function (obj) { return "listController" in obj; }, get: function (obj) { return obj.listController; }, set: function (obj, value) { obj.listController = value; } }, metadata: _metadata }, _listController_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _showHeader_decorators, { kind: "field", name: "showHeader", static: false, private: false, access: { has: function (obj) { return "showHeader" in obj; }, get: function (obj) { return obj.showHeader; }, set: function (obj, value) { obj.showHeader = value; } }, metadata: _metadata }, _showHeader_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _showSearch_decorators, { kind: "field", name: "showSearch", static: false, private: false, access: { has: function (obj) { return "showSearch" in obj; }, get: function (obj) { return obj.showSearch; }, set: function (obj, value) { obj.showSearch = value; } }, metadata: _metadata }, _showSearch_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _selector_decorators, { kind: "field", name: "selector", static: false, private: false, access: { has: function (obj) { return "selector" in obj; }, get: function (obj) { return obj.selector; }, set: function (obj, value) { obj.selector = value; } }, metadata: _metadata }, _selector_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _detailModal_decorators, { kind: "field", name: "detailModal", static: false, private: false, access: { has: function (obj) { return "detailModal" in obj; }, get: function (obj) { return obj.detailModal; }, set: function (obj, value) { obj.detailModal = value; } }, metadata: _metadata }, _detailModal_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _route_decorators, { kind: "field", name: "route", static: false, private: false, access: { has: function (obj) { return "route" in obj; }, get: function (obj) { return obj.route; }, set: function (obj, value) { obj.route = value; } }, metadata: _metadata }, _route_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _childTable_decorators, { kind: "field", name: "childTable", static: false, private: false, access: { has: function (obj) { return "childTable" in obj; }, get: function (obj) { return obj.childTable; }, set: function (obj, value) { obj.childTable = value; } }, metadata: _metadata }, _childTable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _searchQuery_decorators, { kind: "field", name: "searchQuery", static: false, private: false, access: { has: function (obj) { return "searchQuery" in obj; }, get: function (obj) { return obj.searchQuery; }, set: function (obj, value) { obj.searchQuery = value; } }, metadata: _metadata }, _searchQuery_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowClick_decorators, { kind: "field", name: "rowClick", static: false, private: false, access: { has: function (obj) { return "rowClick" in obj; }, get: function (obj) { return obj.rowClick; }, set: function (obj, value) { obj.rowClick = value; } }, metadata: _metadata }, _rowClick_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowDelete_decorators, { kind: "field", name: "rowDelete", static: false, private: false, access: { has: function (obj) { return "rowDelete" in obj; }, get: function (obj) { return obj.rowDelete; }, set: function (obj, value) { obj.rowDelete = value; } }, metadata: _metadata }, _rowDelete_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowExport_decorators, { kind: "field", name: "rowExport", static: false, private: false, access: { has: function (obj) { return "rowExport" in obj; }, get: function (obj) { return obj.rowExport; }, set: function (obj, value) { obj.rowExport = value; } }, metadata: _metadata }, _rowExport_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowCreate_decorators, { kind: "field", name: "rowCreate", static: false, private: false, access: { has: function (obj) { return "rowCreate" in obj; }, get: function (obj) { return obj.rowCreate; }, set: function (obj, value) { obj.rowCreate = value; } }, metadata: _metadata }, _rowCreate_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _getQueryRowsView_decorators, { kind: "field", name: "getQueryRowsView", static: false, private: false, access: { has: function (obj) { return "getQueryRowsView" in obj; }, get: function (obj) { return obj.getQueryRowsView; }, set: function (obj, value) { obj.getQueryRowsView = value; } }, metadata: _metadata }, _getQueryRowsView_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _saveSearchQuery_decorators, { kind: "field", name: "saveSearchQuery", static: false, private: false, access: { has: function (obj) { return "saveSearchQuery" in obj; }, get: function (obj) { return obj.saveSearchQuery; }, set: function (obj, value) { obj.saveSearchQuery = value; } }, metadata: _metadata }, _saveSearchQuery_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _paginator_decorators, { kind: "field", name: "paginator", static: false, private: false, access: { has: function (obj) { return "paginator" in obj; }, get: function (obj) { return obj.paginator; }, set: function (obj, value) { obj.paginator = value; } }, metadata: _metadata }, _paginator_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _sort_decorators, { kind: "field", name: "sort", static: false, private: false, access: { has: function (obj) { return "sort" in obj; }, get: function (obj) { return obj.sort; }, set: function (obj, value) { obj.sort = value; } }, metadata: _metadata }, _sort_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BaseTableDefaultComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BaseTableDefaultComponent = _classThis;
}();
exports.BaseTableDefaultComponent = BaseTableDefaultComponent;
