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
exports.ViewModalComponent = void 0;
require("reflect-metadata");
var core_1 = require("@angular/core");
var src_1 = require("../../../../../../shared/generics/src");
var ListController_1 = require("../../controllers/ListController");
var ViewModalComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'view-modal',
            templateUrl: './view-modal.component.html',
            styleUrls: ['./view-modal.scss'],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _model_decorators;
    var _model_initializers = [];
    var _values_decorators;
    var _values_initializers = [];
    var _state_decorators;
    var _state_initializers = [];
    var _action_decorators;
    var _action_initializers = [];
    var _edit_decorators;
    var _edit_initializers = [];
    var _formController_decorators;
    var _formController_initializers = [];
    var _modelFacade_decorators;
    var _modelFacade_initializers = [];
    var _scope_decorators;
    var _scope_initializers = [];
    var _stepperComponent_decorators;
    var _stepperComponent_initializers = [];
    var ViewModalComponent = _classThis = /** @class */ (function () {
        function ViewModalComponent_1(_matDialog, data, translateService, cdRef) {
            this._matDialog = (__runInitializers(this, _instanceExtraInitializers), _matDialog);
            this.data = data;
            this.translateService = translateService;
            this.cdRef = cdRef;
            this.formStepValid = false;
            this.currentStep = 1;
            this.steps = [];
            this.model = __runInitializers(this, _model_initializers, void 0);
            this.values = __runInitializers(this, _values_initializers, void 0);
            this.state = __runInitializers(this, _state_initializers, void 0);
            this.action = __runInitializers(this, _action_initializers, void 0);
            this.edit = __runInitializers(this, _edit_initializers, false);
            this.formController = __runInitializers(this, _formController_initializers, void 0);
            this.modelFacade = __runInitializers(this, _modelFacade_initializers, void 0);
            this.scope = __runInitializers(this, _scope_initializers, void 0);
            this._fields = [];
            this.className = '';
            this.stepperComponent = __runInitializers(this, _stepperComponent_initializers, void 0);
            this.model = data.model;
            this.modelFacade = data.modelFacade;
            this.edit = data.edit;
            this.values = data.values;
            this.formController = data.formController;
        }
        ViewModalComponent_1.prototype.ngOnInit = function () { };
        ViewModalComponent_1.prototype.ngAfterViewInit = function () {
            var _a, _b;
            if (!this.listController) {
                this.listController = new ListController_1.ListController((_a = this.values) !== null && _a !== void 0 ? _a : this.model, this.modelFacade, this.model);
            }
            this.className = (_b = this.listController.getClassName()) !== null && _b !== void 0 ? _b : '';
            this._fields = Reflect.getMetadata(src_1.VISIBILITY_PREFIX_ALL, this.model);
            this._fields = Reflect.getMetadata(src_1.BUILDERFIELD_ALL_PREFIX, this.model);
            this.cdRef.detectChanges();
        };
        ViewModalComponent_1.prototype.getSettingsField = function (field) {
            return Reflect.getMetadata(src_1.BUILDERFIELD_PREFIX, this.model, field);
        };
        ViewModalComponent_1.prototype.close = function () {
            this._matDialog.closeAll();
        };
        return ViewModalComponent_1;
    }());
    __setFunctionName(_classThis, "ViewModalComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _model_decorators = [(0, core_1.Input)()];
        _values_decorators = [(0, core_1.Input)()];
        _state_decorators = [(0, core_1.Input)()];
        _action_decorators = [(0, core_1.Input)()];
        _edit_decorators = [(0, core_1.Input)()];
        _formController_decorators = [(0, core_1.Input)()];
        _modelFacade_decorators = [(0, core_1.Input)()];
        _scope_decorators = [(0, core_1.Input)()];
        _stepperComponent_decorators = [(0, core_1.ViewChild)('horizontalStepper')];
        __esDecorate(null, null, _model_decorators, { kind: "field", name: "model", static: false, private: false, access: { has: function (obj) { return "model" in obj; }, get: function (obj) { return obj.model; }, set: function (obj, value) { obj.model = value; } }, metadata: _metadata }, _model_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _values_decorators, { kind: "field", name: "values", static: false, private: false, access: { has: function (obj) { return "values" in obj; }, get: function (obj) { return obj.values; }, set: function (obj, value) { obj.values = value; } }, metadata: _metadata }, _values_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _state_decorators, { kind: "field", name: "state", static: false, private: false, access: { has: function (obj) { return "state" in obj; }, get: function (obj) { return obj.state; }, set: function (obj, value) { obj.state = value; } }, metadata: _metadata }, _state_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _action_decorators, { kind: "field", name: "action", static: false, private: false, access: { has: function (obj) { return "action" in obj; }, get: function (obj) { return obj.action; }, set: function (obj, value) { obj.action = value; } }, metadata: _metadata }, _action_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _edit_decorators, { kind: "field", name: "edit", static: false, private: false, access: { has: function (obj) { return "edit" in obj; }, get: function (obj) { return obj.edit; }, set: function (obj, value) { obj.edit = value; } }, metadata: _metadata }, _edit_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _formController_decorators, { kind: "field", name: "formController", static: false, private: false, access: { has: function (obj) { return "formController" in obj; }, get: function (obj) { return obj.formController; }, set: function (obj, value) { obj.formController = value; } }, metadata: _metadata }, _formController_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _modelFacade_decorators, { kind: "field", name: "modelFacade", static: false, private: false, access: { has: function (obj) { return "modelFacade" in obj; }, get: function (obj) { return obj.modelFacade; }, set: function (obj, value) { obj.modelFacade = value; } }, metadata: _metadata }, _modelFacade_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _scope_decorators, { kind: "field", name: "scope", static: false, private: false, access: { has: function (obj) { return "scope" in obj; }, get: function (obj) { return obj.scope; }, set: function (obj, value) { obj.scope = value; } }, metadata: _metadata }, _scope_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _stepperComponent_decorators, { kind: "field", name: "stepperComponent", static: false, private: false, access: { has: function (obj) { return "stepperComponent" in obj; }, get: function (obj) { return obj.stepperComponent; }, set: function (obj, value) { obj.stepperComponent = value; } }, metadata: _metadata }, _stepperComponent_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ViewModalComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ViewModalComponent = _classThis;
}();
exports.ViewModalComponent = ViewModalComponent;
