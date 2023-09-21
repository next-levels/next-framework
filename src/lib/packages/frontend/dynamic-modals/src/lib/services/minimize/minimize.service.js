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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeService = exports.ComponentInstanceTypes = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var create_wizard_component_1 = require("../../components/create-wizard/create-wizard.component");
var src_1 = require("../../../../../../shared/generics/src");
var src_2 = require("../../../../../form-builder/src");
var ComponentInstanceTypes;
(function (ComponentInstanceTypes) {
    ComponentInstanceTypes["AgencyModel"] = "Agentur";
    ComponentInstanceTypes["CustomerModel"] = "Kunde";
    ComponentInstanceTypes["ContractModel"] = "Vertrag";
    ComponentInstanceTypes["InsurerModel"] = "Versicherer";
})(ComponentInstanceTypes || (exports.ComponentInstanceTypes = ComponentInstanceTypes = {}));
var MinimizeService = function () {
    var _classDecorators = [(0, core_1.Injectable)({
            providedIn: 'root',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MinimizeService = _classThis = /** @class */ (function () {
        function MinimizeService_1(_matDialog, store) {
            this._matDialog = _matDialog;
            this.store = store;
        }
        MinimizeService_1.prototype.getLocalStorageKey = function () {
            return 'minimized_modals_';
        };
        MinimizeService_1.prototype.getAll = function () {
            var _a;
            return (0, rxjs_1.of)(JSON.parse((_a = localStorage.getItem(this.getLocalStorageKey())) !== null && _a !== void 0 ? _a : '[]'));
        };
        MinimizeService_1.prototype.findByFilter = function () {
            var _a;
            return (0, rxjs_1.of)(JSON.parse((_a = localStorage.getItem(this.getLocalStorageKey())) !== null && _a !== void 0 ? _a : '[]'));
        };
        MinimizeService_1.prototype.getEntity = function () {
            return (0, rxjs_1.of)({});
        };
        MinimizeService_1.prototype.addEntity = function (componentInstance) {
            componentInstance.type = this.getComponentInstanceType(componentInstance.model.constructor.name);
            var modal = this.setMinimizerOptions(componentInstance);
            var minimizedModals = this.getMinimizedModals();
            minimizedModals.push(modal);
            // localStorage.setItem(
            //   this.getLocalStorageKey(),
            //   JSON.stringify(minimizedModals, this.getCircularReplacer())
            // );
            return (0, rxjs_1.of)(modal);
        };
        MinimizeService_1.prototype.updateEntity = function () {
            return (0, rxjs_1.of)({});
        };
        MinimizeService_1.prototype.deleteEntity = function (modal) {
            var minimizedModals = this.getMinimizedModals();
            var index = minimizedModals.findIndex(function (minimizedModal) {
                return minimizedModal.last_changes === modal.last_changes;
            });
            minimizedModals.splice(index, 1);
            localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(minimizedModals));
            return (0, rxjs_1.of)({});
        };
        MinimizeService_1.prototype.getComponentInstanceType = function (modelName) {
            switch (modelName) {
                case 'AgencyModel':
                    return ComponentInstanceTypes.AgencyModel;
                    break;
                case 'CustomerModel':
                    return ComponentInstanceTypes.CustomerModel;
                    break;
                case 'ContractModel':
                    return ComponentInstanceTypes.ContractModel;
                    break;
                case 'InsurerModel':
                    return ComponentInstanceTypes.InsurerModel;
                    break;
                default:
                    return undefined;
                    break;
            }
        };
        MinimizeService_1.prototype.setMinimizerOptions = function (componentInstance) {
            var _a = componentInstance.formController, modelDefinition = _a.modelDefinition, store = _a.store, restOfFormController = __rest(_a, ["modelDefinition", "store"]);
            return {
                type: componentInstance.type,
                last_changes: new Date().getTime().toString(),
                steps: componentInstance.steps,
                model: componentInstance.model,
                formValues: componentInstance.formController.form.value,
            };
        };
        MinimizeService_1.prototype.removeCircularReferences = function (minimizedModal) {
            var seen = new WeakSet();
            return JSON.stringify(minimizedModal, function (key, value) {
                if (typeof value === 'object' && value !== null) {
                    if (seen.has(value)) {
                        return;
                    }
                    seen.add(value);
                }
                return value;
            });
        };
        MinimizeService_1.prototype.minimizeCurrentModal = function (componentInstance) {
            /*  componentInstance.type = this.getComponentInstanceType(
                componentInstance.model.constructor.name
              );
          */
            componentInstance.type = src_1.META.getNameByModel(componentInstance.model);
            var modal = this.setMinimizerOptions(componentInstance);
            var minimizedModals = this.getMinimizedModals();
            minimizedModals.push(modal);
            localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(minimizedModals));
        };
        MinimizeService_1.prototype.isCyclic = function (obj) {
            var seenObjects = [];
            function detect(obj) {
                if (obj && typeof obj === 'object') {
                    if (seenObjects.indexOf(obj) !== -1) {
                        return true;
                    }
                    seenObjects.push(obj);
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key) && detect(obj[key])) {
                            console.log(obj, 'is cyclic at key', key);
                            return true;
                        }
                    }
                }
                return false;
            }
            return detect(obj);
        };
        MinimizeService_1.prototype.getMinimizedModals = function () {
            var _a, _b;
            var test = JSON.parse((_a = localStorage.getItem(this.getLocalStorageKey())) !== null && _a !== void 0 ? _a : '[]');
            return JSON.parse((_b = localStorage.getItem(this.getLocalStorageKey())) !== null && _b !== void 0 ? _b : '[]');
        };
        MinimizeService_1.prototype.openMinimizedModal = function (modalString) {
            var modal = modalString;
            this._matDialog
                .open(create_wizard_component_1.CreateWizardComponent, {
                autoFocus: false,
                minWidth: '50%',
                data: {
                    model: src_1.META.getModelByName(modal.type),
                    formController: new src_2.FormController(modal.formValues, this.store, src_1.META.getModelByName(modal.type)),
                },
            })
                .afterClosed()
                .subscribe(function () { });
        };
        MinimizeService_1.prototype.deleteMinimizedModal = function (modal) {
            var minimizedModals = this.getMinimizedModals();
            var index = minimizedModals.findIndex(function (minimizedModal) {
                return minimizedModal.last_changes === modal.last_changes;
            });
            minimizedModals.splice(index, 1);
            // localStorage.setItem(
            //   this.getLocalStorageKey(),
            //   JSON.stringify(minimizedModals, this.removeCircularReferences())
            // );
        };
        return MinimizeService_1;
    }());
    __setFunctionName(_classThis, "MinimizeService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MinimizeService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MinimizeService = _classThis;
}();
exports.MinimizeService = MinimizeService;
