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
exports.createBaseEffectServicePair = exports.createBaseFacadeInstance = exports.createBaseFacade = exports.createLocalStorageEffects = exports.createBaseEffects = exports.createStore = exports.createBaseService = void 0;
var core_1 = require("@angular/core");
var local_storage_effects_1 = require("../+state/local-storage.effects");
var base_store_1 = require("./base.store");
var generic_reducers_1 = require("../+state/generic.reducers");
var generic_effects_1 = require("../+state/generic.effects");
var base_facede_1 = require("./base.facede");
function createBaseService(modelUrl) {
    var GenericService = function () {
        var _classDecorators = [(0, core_1.Injectable)({
                providedIn: 'root',
            })];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var GenericService = _classThis = /** @class */ (function () {
            function GenericService_1(_http) {
                this._http = _http;
            }
            GenericService_1.prototype.getEntity = function (id) {
                return this._http.get(modelUrl + '/' + id);
            };
            GenericService_1.prototype.getAll = function () {
                return this._http.get(modelUrl);
            };
            GenericService_1.prototype.findByFilter = function (filter) {
                return this._http.get("".concat(modelUrl, "/filter"), {
                    params: __assign({}, filter),
                });
            };
            GenericService_1.prototype.addEntity = function (data) {
                return this._http.post(modelUrl, data);
            };
            GenericService_1.prototype.deleteEntity = function (entity) {
                return this._http.delete(modelUrl + '/' + entity.id);
            };
            GenericService_1.prototype.updateEntity = function (id, data) {
                return this._http.patch(modelUrl + '/' + id, data);
            };
            return GenericService_1;
        }());
        __setFunctionName(_classThis, "GenericService");
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericService = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericService = _classThis;
    }();
    return GenericService;
}
exports.createBaseService = createBaseService;
function createStore(modelName) {
    var GenericStore = /** @class */ (function (_super) {
        __extends(GenericStore, _super);
        function GenericStore() {
            var _this = _super.call(this, modelName) || this;
            _this.baseReducers = (0, generic_reducers_1.createGenericReducer)(_this.entityName, _this.baseActions, _this.adapter);
            return _this;
        }
        GenericStore.getReducers = function () {
            return new this().baseReducers;
        };
        GenericStore.getActions = function () {
            return new this().baseActions;
        };
        GenericStore.getSelectors = function () {
            return new this().baseSelectors;
        };
        return GenericStore;
    }(base_store_1.BaseStore));
    return GenericStore;
}
exports.createStore = createStore;
function createBaseEffects(serviceToken, actions, name, label) {
    if (label === void 0) { label = ''; }
    var GenericEffectsClass = function () {
        var _classDecorators = [(0, core_1.Injectable)()];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = generic_effects_1.GenericEffects;
        var GenericEffectsClass = _classThis = /** @class */ (function (_super) {
            __extends(GenericEffectsClass_1, _super);
            function GenericEffectsClass_1(actions$, service, translateService) {
                var _this = _super.call(this, actions$, service, actions, name, label, translateService) || this;
                _this.actions$ = actions$;
                _this.service = service;
                _this.translateService = translateService;
                return _this;
            }
            return GenericEffectsClass_1;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericEffectsClass");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericEffectsClass = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericEffectsClass = _classThis;
    }();
    return GenericEffectsClass;
}
exports.createBaseEffects = createBaseEffects;
function createLocalStorageEffects(serviceToken, storeToken, modelName) {
    var GenericEffectsClass = function () {
        var _classDecorators = [(0, core_1.Injectable)()];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = local_storage_effects_1.LocalStorageEffects;
        var GenericEffectsClass = _classThis = /** @class */ (function (_super) {
            __extends(GenericEffectsClass_2, _super);
            function GenericEffectsClass_2(actions$, service, store) {
                var _this = _super.call(this, actions$, service, store.baseActions, modelName) || this;
                _this.actions$ = actions$;
                _this.service = service;
                _this.store = store;
                return _this;
            }
            return GenericEffectsClass_2;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericEffectsClass");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericEffectsClass = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericEffectsClass = _classThis;
    }();
    return GenericEffectsClass;
}
exports.createLocalStorageEffects = createLocalStorageEffects;
function createBaseFacade(storeClass, actions, selectors) {
    var GenericFacade = function () {
        var _classDecorators = [(0, core_1.Injectable)({
                providedIn: 'root',
            })];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = base_facede_1.BaseFacade;
        var GenericFacade = _classThis = /** @class */ (function (_super) {
            __extends(GenericFacade_1, _super);
            function GenericFacade_1(store) {
                var _this = _super.call(this, store, actions, selectors) || this;
                _this.store = store;
                return _this;
            }
            return GenericFacade_1;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericFacade");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericFacade = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericFacade = _classThis;
    }();
    return GenericFacade;
}
exports.createBaseFacade = createBaseFacade;
function createBaseFacadeInstance(storeClass, actions, selectors) {
    var GenericFacade = function () {
        var _classDecorators = [(0, core_1.Injectable)({
                providedIn: 'root',
            })];
        var _classDescriptor;
        var _classExtraInitializers = [];
        var _classThis;
        var _classSuper = base_facede_1.BaseFacade;
        var GenericFacade = _classThis = /** @class */ (function (_super) {
            __extends(GenericFacade_2, _super);
            function GenericFacade_2(store) {
                var _this = _super.call(this, store, actions, selectors) || this;
                _this.store = store;
                return _this;
            }
            return GenericFacade_2;
        }(_classSuper));
        __setFunctionName(_classThis, "GenericFacade");
        (function () {
            var _a;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            GenericFacade = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return GenericFacade = _classThis;
    }();
    return new GenericFacade(storeClass);
}
exports.createBaseFacadeInstance = createBaseFacadeInstance;
function createBaseEffectServicePair(config) {
    var service = createBaseService(config.route);
    var effect = createBaseEffects(config.serviceToken, config.actions, config.name, config.label);
    return {
        serviceToken: config.serviceToken,
        service: service,
        effect: effect,
    };
}
exports.createBaseEffectServicePair = createBaseEffectServicePair;