"use strict";
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
exports.FormSetComponent = void 0;
var core_1 = require("@angular/core");
var FormSetComponent = function () {
    var _classDecorators = [(0, core_1.Component)({
            selector: 'nxtlvls-form-set',
            templateUrl: './form-set.component.html',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _formFields_decorators;
    var _formFields_initializers = [];
    var _fields_decorators;
    var _fields_initializers = [];
    var _controller_decorators;
    var _controller_initializers = [];
    var _readOnly_decorators;
    var _readOnly_initializers = [];
    var _noLabel_decorators;
    var _noLabel_initializers = [];
    var _submitted_decorators;
    var _submitted_initializers = [];
    var _formValid_decorators;
    var _formValid_initializers = [];
    var FormSetComponent = _classThis = /** @class */ (function () {
        function FormSetComponent_1() {
            this.formFields = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _formFields_initializers, void 0));
            this.fields = __runInitializers(this, _fields_initializers, void 0);
            this.controller = __runInitializers(this, _controller_initializers, void 0);
            this.readOnly = __runInitializers(this, _readOnly_initializers, false);
            this.noLabel = __runInitializers(this, _noLabel_initializers, false);
            this.submitted = __runInitializers(this, _submitted_initializers, false);
            this.formValid = __runInitializers(this, _formValid_initializers, new core_1.EventEmitter());
        }
        FormSetComponent_1.prototype.ngOnInit = function () {
            if (this.formFields || this.fields) {
                this.fg = this.controller.getForm();
            }
        };
        FormSetComponent_1.prototype.isFormValid = function (event) {
            var _a, _b, _c, _d, _e, _f, _g;
            if (!event) {
                return this.formValid.emit(false);
            }
            if (this.formFields) {
                for (var i = 0; i < this.formFields.length; i++) {
                    var formFieldName = (_a = this.formFields[i]) === null || _a === void 0 ? void 0 : _a.name;
                    if (formFieldName &&
                        ((_d = (_c = (_b = this.controller) === null || _b === void 0 ? void 0 : _b.getForm()) === null || _c === void 0 ? void 0 : _c.get(formFieldName)) === null || _d === void 0 ? void 0 : _d.invalid)) {
                        return this.formValid.emit(false);
                    }
                }
            }
            else {
                for (var i = 0; i < this.fields.length; i++) {
                    if ((_g = (_f = (_e = this.controller) === null || _e === void 0 ? void 0 : _e.getForm()) === null || _f === void 0 ? void 0 : _f.get(this.fields[i])) === null || _g === void 0 ? void 0 : _g.invalid) {
                        return this.formValid.emit(false);
                    }
                }
            }
            this.formValid.emit(true);
        };
        return FormSetComponent_1;
    }());
    __setFunctionName(_classThis, "FormSetComponent");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _formFields_decorators = [(0, core_1.Input)()];
        _fields_decorators = [(0, core_1.Input)()];
        _controller_decorators = [(0, core_1.Input)()];
        _readOnly_decorators = [(0, core_1.Input)()];
        _noLabel_decorators = [(0, core_1.Input)()];
        _submitted_decorators = [(0, core_1.Input)()];
        _formValid_decorators = [(0, core_1.Output)()];
        __esDecorate(null, null, _formFields_decorators, { kind: "field", name: "formFields", static: false, private: false, access: { has: function (obj) { return "formFields" in obj; }, get: function (obj) { return obj.formFields; }, set: function (obj, value) { obj.formFields = value; } }, metadata: _metadata }, _formFields_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _fields_decorators, { kind: "field", name: "fields", static: false, private: false, access: { has: function (obj) { return "fields" in obj; }, get: function (obj) { return obj.fields; }, set: function (obj, value) { obj.fields = value; } }, metadata: _metadata }, _fields_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _controller_decorators, { kind: "field", name: "controller", static: false, private: false, access: { has: function (obj) { return "controller" in obj; }, get: function (obj) { return obj.controller; }, set: function (obj, value) { obj.controller = value; } }, metadata: _metadata }, _controller_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _readOnly_decorators, { kind: "field", name: "readOnly", static: false, private: false, access: { has: function (obj) { return "readOnly" in obj; }, get: function (obj) { return obj.readOnly; }, set: function (obj, value) { obj.readOnly = value; } }, metadata: _metadata }, _readOnly_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _noLabel_decorators, { kind: "field", name: "noLabel", static: false, private: false, access: { has: function (obj) { return "noLabel" in obj; }, get: function (obj) { return obj.noLabel; }, set: function (obj, value) { obj.noLabel = value; } }, metadata: _metadata }, _noLabel_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _submitted_decorators, { kind: "field", name: "submitted", static: false, private: false, access: { has: function (obj) { return "submitted" in obj; }, get: function (obj) { return obj.submitted; }, set: function (obj, value) { obj.submitted = value; } }, metadata: _metadata }, _submitted_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _formValid_decorators, { kind: "field", name: "formValid", static: false, private: false, access: { has: function (obj) { return "formValid" in obj; }, get: function (obj) { return obj.formValid; }, set: function (obj, value) { obj.formValid = value; } }, metadata: _metadata }, _formValid_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormSetComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormSetComponent = _classThis;
}();
exports.FormSetComponent = FormSetComponent;
