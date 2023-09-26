"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputRelationDropdownComponent = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var forms_1 = require("@angular/forms");
var base_input_component_1 = require("./base-input.component");
var BaseInputRelationDropdownComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxt-input-relation-dropdown',
            template: '<ng-container ></ng-container>',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_input_component_1.BaseInputComponent;
    var BaseInputRelationDropdownComponent = _classThis = /** @class */ (function (_super) {
        __extends(BaseInputRelationDropdownComponent_1, _super);
        function BaseInputRelationDropdownComponent_1(store, cdRef, translateService, registry) {
            var _this = _super.call(this, cdRef, translateService) || this;
            _this.store = store;
            _this.cdRef = cdRef;
            _this.translateService = translateService;
            _this.registry = registry;
            _this.data = [];
            _this.options = [];
            return _this;
        }
        BaseInputRelationDropdownComponent_1.prototype.init = function () {
            var _a, _b;
            if (this.formField.name) {
                var model = (_a = this.formController) === null || _a === void 0 ? void 0 : _a.getModelDefinition();
                this.options = model === null || model === void 0 ? void 0 : model.getFieldValues((_b = this.formField) === null || _b === void 0 ? void 0 : _b.name);
            }
        };
        BaseInputRelationDropdownComponent_1.prototype.logChange = function (event) {
            var _a;
            this.fg.patchValue((_a = {}, _a[this.formField.name] = event === null || event === void 0 ? void 0 : event.value, _a));
            this.dataOutput.emit(event === null || event === void 0 ? void 0 : event.value);
        };
        BaseInputRelationDropdownComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b, _c, _d;
            this.settings = this.formController
                .getModelDefinition()
                .relations(this.formField.name);
            this.fg = (_a = this.formController) === null || _a === void 0 ? void 0 : _a.getForm();
            this.formField.label = (_b = this.formField.label) !== null && _b !== void 0 ? _b : this.formField.name;
            this.dependency = (_c = this.formController) === null || _c === void 0 ? void 0 : _c.getDependency(this.formField.name);
            this.visibilityOptions = (_d = this.formController) === null || _d === void 0 ? void 0 : _d.getVisibility(this.formField.name);
            if (this.formField) {
                this.translateService
                    .get(this.formController.getElementLabel(this.formField.name))
                    .subscribe(function (translated) {
                    var _a;
                    _this.formField.label = translated !== null && translated !== void 0 ? translated : _this.formField.name;
                    if ((_a = _this.formField) === null || _a === void 0 ? void 0 : _a.required) {
                        _this.formField.label = _this.formField.label + '*';
                    }
                });
            }
            if (this.settings.action !== undefined &&
                this.settings.selector !== undefined) {
                this.store.dispatch(this.settings.action);
                this.store.pipe((0, store_1.select)(this.settings.selector)).subscribe(function (data) {
                    _this.data = data;
                    console.log(data);
                    _this.mapData(data);
                });
            }
            else {
                if (this.registry.retrieve(this.formController.getClassName())) {
                    this.facade = this.registry.retrieve(this.formController.getClassName());
                    this.facade.base.loadFiltered();
                    console.log(this.facade.base.filtered$);
                    this.facade.base.filtered$.subscribe(function (data) { return _this.mapData(data); });
                }
            }
            this._value = '';
            this.formControl = new forms_1.FormControl(this._value, [forms_1.Validators.required]);
            if (this.formController && this.formField.name) {
                this.formController.addFormControl(this.formControl, this.formField.name);
            }
            this.fg = this.formController.getForm();
            this.initFilter();
        };
        BaseInputRelationDropdownComponent_1.prototype.initFilter = function () {
            var _this = this;
            var _a, _b, _c;
            if (((_a = this.dependency) === null || _a === void 0 ? void 0 : _a.field) &&
                ((_b = this.fg) === null || _b === void 0 ? void 0 : _b.controls[this.dependency.field]) &&
                ((_c = this.dependency) === null || _c === void 0 ? void 0 : _c.value) === undefined) {
                this.fg.controls[this.dependency.field].valueChanges.subscribe(function (value) {
                    var _a;
                    _this.mapData(_this.filterArrayByProperty(_this.data, (_a = _this.dependency) === null || _a === void 0 ? void 0 : _a.field, value));
                    _this.cdRef.detectChanges();
                });
            }
        };
        BaseInputRelationDropdownComponent_1.prototype.filterArrayByProperty = function (array, propName, value) {
            return array.filter(function (item) { return item[propName] === value; });
        };
        BaseInputRelationDropdownComponent_1.prototype.mapData = function (data) {
            var _this = this;
            this.options = data.map(function (selectedFieldArray) {
                var fieldValues = [];
                _this.settings.fields.forEach(function (field) {
                    var value = selectedFieldArray;
                    field.split('.').forEach(function (key) {
                        value = value ? value[key] : null;
                    });
                    if (value !== null)
                        fieldValues.push(value);
                });
                return {
                    value: selectedFieldArray['id'],
                    label: fieldValues.join(' | '),
                };
            });
            if (this.formField.name) {
                var value_1 = this.formController.getValue(this.formField.name);
                var index = this.options.findIndex(function (a) { return a.value == value_1; });
                if (index > -1) {
                    this.selected = this.options[index].value;
                }
            }
        };
        return BaseInputRelationDropdownComponent_1;
    }(_classSuper));
    __setFunctionName(_classThis, "BaseInputRelationDropdownComponent");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BaseInputRelationDropdownComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BaseInputRelationDropdownComponent = _classThis;
}();
exports.BaseInputRelationDropdownComponent = BaseInputRelationDropdownComponent;