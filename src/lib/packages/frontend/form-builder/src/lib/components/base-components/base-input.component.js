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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var BaseInputComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            template: '<ng-container ></ng-container>',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _class_decorators;
    var _class_initializers = [];
    var _formField_decorators;
    var _formField_initializers = [];
    var _formController_decorators;
    var _formController_initializers = [];
    var _dataOutput_decorators;
    var _dataOutput_initializers = [];
    var BaseInputComponent = _classThis = /** @class */ (function () {
        function BaseInputComponent_1(cdRef, translateService) {
            this.cdRef = (__runInitializers(this, _instanceExtraInitializers), cdRef);
            this.translateService = translateService;
            this.class = __runInitializers(this, _class_initializers, 'flex flex-col');
            this.formField = __runInitializers(this, _formField_initializers, void 0);
            this.formController = __runInitializers(this, _formController_initializers, void 0);
            this.dataOutput = __runInitializers(this, _dataOutput_initializers, new core_1.EventEmitter());
            this.changed = false;
            this.dependency = null;
            this.value = '';
            this.disabled = false;
            this.updateOn = 'change';
        }
        BaseInputComponent_1.prototype.ngOnInit = function () {
            var _this = this;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            if (this.formField && this.formField.name) {
                this.fg = (_a = this.formController) === null || _a === void 0 ? void 0 : _a.getForm();
                this.formField.label = (_b = this.formField.label) !== null && _b !== void 0 ? _b : this.formField.name;
                this.dependency = (_c = this.formController) === null || _c === void 0 ? void 0 : _c.getDependency(this.formField.name);
                this.value = (_d = this.formController) === null || _d === void 0 ? void 0 : _d.getValue(this.formField.name);
                this.disabled = (_e = this.formField.disabled) !== null && _e !== void 0 ? _e : this.disabled;
                this.updateOn = this.formField.updateOn;
                this.visibilityOptions = (_f = this.formController) === null || _f === void 0 ? void 0 : _f.getVisibility(this.formField.name);
                if ((_g = this.visibilityOptions) === null || _g === void 0 ? void 0 : _g.comment) {
                    this.translateService
                        .get(this.formController.getElementLabel(this.visibilityOptions.comment))
                        .subscribe(function (translated) {
                        _this.comment = translated;
                    });
                }
                if ((_h = this.visibilityOptions) === null || _h === void 0 ? void 0 : _h.headline) {
                    this.translateService
                        .get(this.formController.getElementLabel(this.visibilityOptions.headline))
                        .subscribe(function (translated) {
                        _this.headline = translated;
                    });
                }
                this.initFormControl();
                this.initDependency();
                this.init();
            }
        };
        BaseInputComponent_1.prototype.initFormControl = function () {
            var _this = this;
            var _a, _b;
            var validators = [];
            if (((_a = this.formField) === null || _a === void 0 ? void 0 : _a.validation) && this.formField.validation.validation) {
                validators.push(this.formField.validation.validation);
            }
            if (this.formField) {
                this.translateService
                    .get(this.formController.getElementLabel(this.formField.name))
                    .subscribe(function (translated) {
                    var _a;
                    _this.formField.label = translated !== null && translated !== void 0 ? translated : _this.formField.name;
                    if ((_a = _this.formField) === null || _a === void 0 ? void 0 : _a.required) {
                        validators.push(forms_1.Validators.required);
                        _this.formField.label = _this.formField.label + '*';
                    }
                });
            }
            // Create a new form control with the given values
            this.formControl = new forms_1.FormControl({
                value: this.value,
                disabled: this.disabled,
            }, {
                validators: validators,
                updateOn: this.updateOn,
            });
            if (this.formControl && this.formField.name) {
                (_b = this.formController) === null || _b === void 0 ? void 0 : _b.addFormControl(this.formControl, this.formField.name);
            }
        };
        BaseInputComponent_1.prototype.initDependency = function () {
            var _this = this;
            var _a, _b, _c;
            if (((_a = this.dependency) === null || _a === void 0 ? void 0 : _a.field) && ((_b = this.fg) === null || _b === void 0 ? void 0 : _b.controls[this.dependency.field])) {
                // Get initial value of the dependency and check if the dependency is valid
                var initalValue = (_c = this.formController) === null || _c === void 0 ? void 0 : _c.getValue(this.dependency.field);
                this.checkDependency(initalValue);
                // Subscribe to value changes of the dependency
                this.fg.controls[this.dependency.field].valueChanges.subscribe(function (value) {
                    _this.checkDependency(value);
                });
            }
        };
        BaseInputComponent_1.prototype.init = function () {
            // override this method in child classes
        };
        BaseInputComponent_1.prototype.checkDependency = function (value) {
            var _a, _b;
            if (((_a = this.dependency) === null || _a === void 0 ? void 0 : _a.field) && this.formField) {
                if ((_b = this.fg) === null || _b === void 0 ? void 0 : _b.controls[this.dependency.field]) {
                    var dependencyValue = this.dependency.value;
                    this.formField.hidden = dependencyValue !== value;
                }
            }
        };
        BaseInputComponent_1.prototype.changeValue = function (value) {
            this.dataOutput.emit(value);
        };
        return BaseInputComponent_1;
    }());
    __setFunctionName(_classThis, "BaseInputComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _class_decorators = [(0, core_1.HostBinding)('class')];
        _formField_decorators = [(0, core_1.Input)()];
        _formController_decorators = [(0, core_1.Input)()];
        _dataOutput_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _class_decorators, { kind: "field", name: "class", static: false, private: false, access: { has: function (obj) { return "class" in obj; }, get: function (obj) { return obj.class; }, set: function (obj, value) { obj.class = value; } }, metadata: _metadata }, _class_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _formField_decorators, { kind: "field", name: "formField", static: false, private: false, access: { has: function (obj) { return "formField" in obj; }, get: function (obj) { return obj.formField; }, set: function (obj, value) { obj.formField = value; } }, metadata: _metadata }, _formField_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _formController_decorators, { kind: "field", name: "formController", static: false, private: false, access: { has: function (obj) { return "formController" in obj; }, get: function (obj) { return obj.formController; }, set: function (obj, value) { obj.formController = value; } }, metadata: _metadata }, _formController_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _dataOutput_decorators, { kind: "field", name: "dataOutput", static: false, private: false, access: { has: function (obj) { return "dataOutput" in obj; }, get: function (obj) { return obj.dataOutput; }, set: function (obj, value) { obj.dataOutput = value; } }, metadata: _metadata }, _dataOutput_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BaseInputComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BaseInputComponent = _classThis;
}();
exports.BaseInputComponent = BaseInputComponent;
