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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewElementComponent = void 0;
var core_1 = require("@angular/core");
var src_1 = require("../../../../../../../shared/generics/src");
var ViewElementComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxtlvls-view-element',
            templateUrl: './view-element.component.html',
            styleUrls: ['./view-element.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _view_decorators;
    var _view_initializers = [];
    var _fieldName_decorators;
    var _fieldName_initializers = [];
    var _viewModel_decorators;
    var _viewModel_initializers = [];
    var _viewObject_decorators;
    var _viewObject_initializers = [];
    var _detailView_decorators;
    var _detailView_initializers = [];
    var _listController_decorators;
    var _listController_initializers = [];
    var ViewElementComponent = _classThis = /** @class */ (function () {
        function ViewElementComponent_1(translateService, cdRef, listBuilderComponents) {
            this.translateService = (__runInitializers(this, _instanceExtraInitializers), translateService);
            this.cdRef = cdRef;
            this.listBuilderComponents = listBuilderComponents;
            this.view = __runInitializers(this, _view_initializers, void 0);
            this.fieldName = __runInitializers(this, _fieldName_initializers, void 0);
            this.viewModel = __runInitializers(this, _viewModel_initializers, void 0);
            this.viewObject = __runInitializers(this, _viewObject_initializers, void 0);
            this.detailView = __runInitializers(this, _detailView_initializers, false);
            this.listController = __runInitializers(this, _listController_initializers, void 0);
        }
        ViewElementComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            this.translateService.get('test').subscribe(function (translated) {
                var labelCode = src_1.META.getNameByModel(_this.listController.getModelDefinition()) +
                    '.properties.' +
                    _this.fieldName;
                _this.listField = {
                    label: _this.translateService.instant(labelCode),
                };
            });
        };
        ViewElementComponent_1.prototype.ngAfterViewInit = function () {
            if (this.fieldName) {
                if (this.viewObject) {
                    var type = null;
                    this.listField = this.getBuildField(this.fieldName);
                    this.listField = __assign(__assign({}, this.listField), this.getSettingsField(this.fieldName));
                    var labelCode = src_1.META.getNameByModel(this.listController.getModelDefinition()) +
                        '.properties.' +
                        this.fieldName;
                    this.listField.label = this.translateService.instant(labelCode);
                    if (this.listBuilderComponents) {
                        var component = this.listBuilderComponents[this.listField.type];
                        if (component) {
                            var componentRef = this.view.createComponent(component);
                            this.initComponent(componentRef);
                        }
                        else {
                            console.info("No component found for type: ".concat(this.listField.type));
                        }
                    }
                }
            }
        };
        ViewElementComponent_1.prototype.getSettingsField = function (field) {
            return Reflect.getMetadata(src_1.LISTFIELD_PREFIX, this.listController.getModelDefinition(), field);
        };
        ViewElementComponent_1.prototype.getBuildField = function (field) {
            return Reflect.getMetadata(src_1.BUILDERFIELD_PREFIX, this.listController.getModelDefinition(), field);
        };
        ViewElementComponent_1.prototype.initComponent = function (componentRef) {
            componentRef.instance.fieldName = this.fieldName;
            componentRef.instance.listField = this.listField;
            componentRef.instance.listController = this.listController;
            componentRef.instance.viewObject = this.viewObject;
            componentRef.instance.detailView = this.detailView;
            this.cdRef.detectChanges();
        };
        return ViewElementComponent_1;
    }());
    __setFunctionName(_classThis, "ViewElementComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _view_decorators = [(0, core_1.ViewChild)('view', { read: core_1.ViewContainerRef })];
        _fieldName_decorators = [(0, core_1.Input)()];
        _viewModel_decorators = [(0, core_1.Input)()];
        _viewObject_decorators = [(0, core_1.Input)()];
        _detailView_decorators = [(0, core_1.Input)()];
        _listController_decorators = [(0, core_1.Input)()];
        __esDecorate(null, null, _view_decorators, { kind: "field", name: "view", static: false, private: false, access: { has: function (obj) { return "view" in obj; }, get: function (obj) { return obj.view; }, set: function (obj, value) { obj.view = value; } }, metadata: _metadata }, _view_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _fieldName_decorators, { kind: "field", name: "fieldName", static: false, private: false, access: { has: function (obj) { return "fieldName" in obj; }, get: function (obj) { return obj.fieldName; }, set: function (obj, value) { obj.fieldName = value; } }, metadata: _metadata }, _fieldName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _viewModel_decorators, { kind: "field", name: "viewModel", static: false, private: false, access: { has: function (obj) { return "viewModel" in obj; }, get: function (obj) { return obj.viewModel; }, set: function (obj, value) { obj.viewModel = value; } }, metadata: _metadata }, _viewModel_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _viewObject_decorators, { kind: "field", name: "viewObject", static: false, private: false, access: { has: function (obj) { return "viewObject" in obj; }, get: function (obj) { return obj.viewObject; }, set: function (obj, value) { obj.viewObject = value; } }, metadata: _metadata }, _viewObject_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _detailView_decorators, { kind: "field", name: "detailView", static: false, private: false, access: { has: function (obj) { return "detailView" in obj; }, get: function (obj) { return obj.detailView; }, set: function (obj, value) { obj.detailView = value; } }, metadata: _metadata }, _detailView_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _listController_decorators, { kind: "field", name: "listController", static: false, private: false, access: { has: function (obj) { return "listController" in obj; }, get: function (obj) { return obj.listController; }, set: function (obj, value) { obj.listController = value; } }, metadata: _metadata }, _listController_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewElementComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewElementComponent = _classThis;
}();
exports.ViewElementComponent = ViewElementComponent;
