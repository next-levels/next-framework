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
exports.RootStoreModule = void 0;
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var src_1 = require("../../../angular-commons/src");
var src_2 = require("../../../../shared/generics/src");
var generic_factory_1 = require("./factory/generic.factory");
var RootStoreModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({})];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var RootStoreModule = _classThis = /** @class */ (function () {
        function RootStoreModule_1() {
        }
        RootStoreModule_1.forFeature = function (model) {
            var providers = [];
            var imports = [];
            var config = src_2.META.getOptionsByModel(model.prototype);
            var injector = core_1.Injector.create({
                providers: [{ provide: src_1.EnvironmentStorageService, deps: [] }],
            });
            var storedEnvironment = injector.get(src_1.EnvironmentStorageService);
            var apiUrl = "".concat(storedEnvironment.baseUrl, "/").concat(config.url); // wird später aktualisiert
            var store = (0, generic_factory_1.getStoreFeatures)(model, __assign(__assign({}, config), { route: apiUrl }));
            providers.push({
                provide: store.storeToken,
                useValue: store.store,
            });
            providers.push({
                provide: store.facadeToken,
                useClass: store.facade,
                deps: [store_1.Store, store.storeToken],
            });
            providers.push.apply(providers, __spreadArray(__spreadArray([], store.services, false), store.effects, false));
            var DynamicStoreModule = function () {
                var _classDecorators = [(0, core_1.NgModule)({
                        imports: [
                            store_1.StoreModule.forFeature(store.store.featureKey, store.store.baseReducers),
                            effects_1.EffectsModule.forFeature(__spreadArray([], store.effects, true)),
                        ],
                    })];
                var _classDescriptor;
                var _classExtraInitializers = [];
                var _classThis;
                var DynamicStoreModule = _classThis = /** @class */ (function () {
                    function DynamicStoreModule_1(registry, NGRXstore) {
                        this.registry = registry;
                        this.NGRXstore = NGRXstore;
                        this.registry.register(model, new store.facade(NGRXstore, store.store));
                    }
                    return DynamicStoreModule_1;
                }());
                __setFunctionName(_classThis, "DynamicStoreModule");
                (function () {
                    var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    DynamicStoreModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return DynamicStoreModule = _classThis;
            }();
            return {
                ngModule: DynamicStoreModule,
                providers: providers,
            };
        };
        return RootStoreModule_1;
    }());
    __setFunctionName(_classThis, "RootStoreModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RootStoreModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RootStoreModule = _classThis;
}();
exports.RootStoreModule = RootStoreModule;
