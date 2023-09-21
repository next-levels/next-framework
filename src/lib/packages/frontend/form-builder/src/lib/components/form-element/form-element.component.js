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
exports.FormElementComponent = void 0;
var core_1 = require("@angular/core");
var src_1 = require("../../../../../../shared/generics/src");
var FormElementComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxt-form-element',
            templateUrl: './form-element.component.html',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _view_decorators;
    var _view_initializers = [];
    var _formField_decorators;
    var _formField_initializers = [];
    var _formController_decorators;
    var _formController_initializers = [];
    var _fieldName_decorators;
    var _fieldName_initializers = [];
    var _dataOutput_decorators;
    var _dataOutput_initializers = [];
    var FormElementComponent = _classThis = /** @class */ (function () {
        function FormElementComponent_1(cdRef, formBuilderComponents) {
            this.cdRef = (__runInitializers(this, _instanceExtraInitializers), cdRef);
            this.formBuilderComponents = formBuilderComponents;
            this.view = __runInitializers(this, _view_initializers, void 0);
            this.formField = __runInitializers(this, _formField_initializers, void 0);
            this.formController = __runInitializers(this, _formController_initializers, void 0);
            this.fieldName = __runInitializers(this, _fieldName_initializers, '');
            this.dataOutput = __runInitializers(this, _dataOutput_initializers, new core_1.EventEmitter());
        }
        FormElementComponent_1.prototype.ngAfterViewInit = function () {
            var _a, _b;
            var componentRef;
            if (this.view !== undefined && this.fieldName) {
                this.formField = Reflect.getMetadata(src_1.FORMFIELD_PREFIX, (_a = this.formController) === null || _a === void 0 ? void 0 : _a.getModelDefinition(), this.fieldName);
                var baseField = Reflect.getMetadata(src_1.BUILDERFIELD_PREFIX, (_b = this.formController) === null || _b === void 0 ? void 0 : _b.getModelDefinition(), this.fieldName);
                this.formField = __assign(__assign({}, this.formField), baseField);
                this.formField.name = this.fieldName;
                if (!this.formField.type) {
                    return;
                }
                var componentRef_1 = this.view.createComponent(this.formBuilderComponents[this.formField.type]);
                this.initComponent(componentRef_1);
            }
        };
        FormElementComponent_1.prototype.initComponent = function (componentRef) {
            componentRef.instance.formField = this.formField;
            componentRef.instance.formController = this.formController;
            componentRef.instance.dataOutput = this.dataOutput;
        };
        FormElementComponent_1.prototype.getFormControl = function () {
            if (this.formController && this.fieldName) {
                return this.formController.getControl(this.fieldName);
            }
            return null;
        };
        return FormElementComponent_1;
    }());
    __setFunctionName(_classThis, "FormElementComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _view_decorators = [(0, core_1.ViewChild)('input', { read: core_1.ViewContainerRef })];
        _formField_decorators = [(0, core_1.Input)()];
        _formController_decorators = [(0, core_1.Input)()];
        _fieldName_decorators = [(0, core_1.Input)()];
        _dataOutput_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _view_decorators, { kind: "field", name: "view", static: false, private: false, access: { has: function (obj) { return "view" in obj; }, get: function (obj) { return obj.view; }, set: function (obj, value) { obj.view = value; } }, metadata: _metadata }, _view_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _formField_decorators, { kind: "field", name: "formField", static: false, private: false, access: { has: function (obj) { return "formField" in obj; }, get: function (obj) { return obj.formField; }, set: function (obj, value) { obj.formField = value; } }, metadata: _metadata }, _formField_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _formController_decorators, { kind: "field", name: "formController", static: false, private: false, access: { has: function (obj) { return "formController" in obj; }, get: function (obj) { return obj.formController; }, set: function (obj, value) { obj.formController = value; } }, metadata: _metadata }, _formController_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _fieldName_decorators, { kind: "field", name: "fieldName", static: false, private: false, access: { has: function (obj) { return "fieldName" in obj; }, get: function (obj) { return obj.fieldName; }, set: function (obj, value) { obj.fieldName = value; } }, metadata: _metadata }, _fieldName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _dataOutput_decorators, { kind: "field", name: "dataOutput", static: false, private: false, access: { has: function (obj) { return "dataOutput" in obj; }, get: function (obj) { return obj.dataOutput; }, set: function (obj, value) { obj.dataOutput = value; } }, metadata: _metadata }, _dataOutput_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormElementComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormElementComponent = _classThis;
}();
exports.FormElementComponent = FormElementComponent;
