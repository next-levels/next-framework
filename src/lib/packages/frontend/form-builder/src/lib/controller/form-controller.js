"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormController = void 0;
var forms_1 = require("@angular/forms");
var src_1 = require("../../../../../shared/generics/src");
var FormController = /** @class */ (function () {
    function FormController(model, facade, modelDefinition) {
        if (facade === void 0) { facade = null; }
        if (modelDefinition === void 0) { modelDefinition = null; }
        this.modelDefinition = null;
        this.beforeSaveFunction = null;
        if (facade) {
            this.store = facade.store;
            this.facade = facade;
        }
        this.model = model;
        if (modelDefinition) {
            this.modelDefinition = modelDefinition;
        }
        else {
            this.modelDefinition = model;
        }
        this.form = new forms_1.UntypedFormGroup({}, null, null);
    }
    FormController.prototype.getClassName = function () {
        return src_1.META.getNameByModel(this.getModelDefinition());
    };
    FormController.prototype.addFormControl = function (control, name) {
        this.form.addControl(name, control);
    };
    FormController.prototype.setModel = function (model) {
        this.model = model;
    };
    FormController.prototype.makeFormGroupReadOnly = function () {
        this.makeFormReadOnly(this.form);
    };
    FormController.prototype.makeFormReadOnly = function (formGroup) {
        var _this = this;
        Object.keys(formGroup.controls).forEach(function (key) {
            var control = formGroup.controls[key];
            if (control instanceof forms_1.UntypedFormGroup) {
                _this.makeFormReadOnly(control);
            }
            else {
                control.disable();
            }
        });
    };
    FormController.prototype.save = function (formValues) {
        if (formValues === void 0) { formValues = null; }
        if (this.form.valid) {
            this.facade.save(this.form.value);
        }
    };
    FormController.prototype.create = function (scope) {
        if (scope === void 0) { scope = null; }
        return __awaiter(this, void 0, void 0, function () {
            var entity, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.form.valid) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.beforeSave()];
                    case 2:
                        _a.sent();
                        entity = this.form.value;
                        if (scope && scope.length > 0) {
                            entity[scope[0].key] = scope[0].value;
                        }
                        this.facade.base.add(entity);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FormController.prototype.applyScope = function (scope) { };
    FormController.prototype.getForm = function () {
        return this.form;
    };
    FormController.prototype.extendForm = function (form) {
        return form;
    };
    FormController.prototype.load = function () { };
    FormController.prototype.beforeSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.beforeSaveFunction) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.beforeSaveFunction(this.form)];
                    case 1:
                        _a.form = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FormController.prototype.cleanForm = function () {
        this.form.markAsPristine();
    };
    FormController.prototype.getModel = function () {
        return this.model;
    };
    FormController.prototype.getStore = function () {
        return this.store;
    };
    FormController.prototype.getControl = function (fieldName) {
        return this.form.get(fieldName);
    };
    FormController.prototype.getValue = function (name) {
        if (this.model !== undefined &&
            this.model[name] !== undefined) {
            return this.model[name] !== undefined
                ? this.model[name]
                : null;
        }
    };
    FormController.prototype.patchValues = function (values) {
        this.form.patchValue(values);
    };
    FormController.prototype.getModelDefinition = function () {
        return this.modelDefinition;
    };
    FormController.prototype.getElementLabel = function (fieldName) {
        return (src_1.META.getNameByModel(this.getModelDefinition()) +
            '.properties.' +
            fieldName);
    };
    FormController.prototype.getDependency = function (fieldName) {
        if (!this.getModelDefinition() && !fieldName) {
            return null;
        }
        return Reflect.getMetadata('fb:dependency', this.getModelDefinition(), fieldName);
    };
    FormController.prototype.getVisibility = function (fieldName) {
        if (!this.getModelDefinition() && !fieldName) {
            return null;
        }
        return Reflect.getMetadata(src_1.VISIBILITY_PREFIX, this.getModelDefinition(), fieldName);
    };
    FormController.prototype.registerBeforeSaveFunction = function (fn) {
        this.beforeSaveFunction = fn;
    };
    return FormController;
}());
exports.FormController = FormController;
