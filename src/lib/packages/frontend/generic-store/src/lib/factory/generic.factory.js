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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreFeatures = exports.createGenericStore = exports.createService = void 0;
var core_1 = require("@angular/core");
var entity_1 = require("@ngrx/entity");
var reducer_factory_1 = require("./reducer.factory");
var generic_facade_1 = require("./generic.facade");
var src_1 = require("../../../../../shared/generics/src");
var base_factory_1 = require("./base.factory");
var notification_factory_1 = require("../+store-types/notifcation/notification.factory");
var generic_actions_1 = require("../+state/generic.actions");
var notification_actions_1 = require("../+store-types/notifcation/notification.actions");
var generic_selectors_1 = require("../+state/generic.selectors");
var notification_selectors_1 = require("../+store-types/notifcation/notification.selectors");
function createService(modelUrl) {
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
exports.createService = createService;
function createGenericStore(modelName, funcArray, selectorArray, features) {
    if (features === void 0) { features = ['notification', 'basic']; }
    var GenericStore = /** @class */ (function () {
        function GenericStore() {
            this.adapter = (0, entity_1.createEntityAdapter)();
            this.featureKey = modelName;
            var actionInstances = [];
            for (var _i = 0, funcArray_1 = funcArray; _i < funcArray_1.length; _i++) {
                var func = funcArray_1[_i];
                actionInstances.push(func(modelName));
            }
            this.baseActions = actionInstances.reduce(function (combinedActions, actions) { return (__assign(__assign({}, combinedActions), actions)); }, {});
            var selectorInstances = [];
            for (var _a = 0, selectorArray_1 = selectorArray; _a < selectorArray_1.length; _a++) {
                var func = selectorArray_1[_a];
                selectorInstances.push(func(modelName, this.adapter));
            }
            this.baseSelectors = selectorInstances.reduce(function (combinedSelectors, selectors) { return (__assign(__assign({}, combinedSelectors), selectors)); }, {});
            this.baseReducers = (0, reducer_factory_1.createReducers)(features, modelName, this.baseActions, this.adapter);
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
    }());
    return GenericStore;
}
exports.createGenericStore = createGenericStore;
function getEffectService(feature, actions, name, route, label) {
    if (label === void 0) { label = ''; }
    var serviceToken = new core_1.InjectionToken("".concat(name).concat(feature, "Service"));
    var config = {
        name: name,
        route: route,
        actions: actions,
        serviceToken: serviceToken,
        label: label,
    };
    switch (feature) {
        case 'base':
            return (0, base_factory_1.createBaseEffectServicePair)(config);
        case 'notification':
            return (0, notification_factory_1.createNotificationEffectServicePair)(config);
        default:
            throw new Error("Feature ".concat(feature, " not found"));
    }
}
function getAction(feature) {
    switch (feature) {
        case 'base':
            return generic_actions_1.createGenericActions;
        case 'notification':
            return notification_actions_1.createNotificationActions;
        default:
            throw new Error("Feature ".concat(feature, " not found"));
    }
}
function getSelector(feature) {
    switch (feature) {
        case 'base':
            return generic_selectors_1.createGenericSelectorsFeature;
        case 'notification':
            return notification_selectors_1.createNotificationSelectorsFeature;
        default:
            throw new Error("Feature ".concat(feature, " not found"));
    }
}
function getStoreFeatures(entity, config) {
    var funcArray = [];
    var selectorArray = [];
    var effectsList = [];
    var StoreToken = new core_1.InjectionToken(name + 'Store');
    var FacadeToken = new core_1.InjectionToken(name + 'Facade');
    config.name = src_1.META.getNameByModel(entity.prototype);
    for (var _i = 0, _a = config.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        var action = getAction(feature);
        if (action) {
            funcArray.push(action);
        }
        var selector = getSelector(feature);
        if (selector) {
            selectorArray.push(selector);
        }
    }
    if (config.selectors) {
        for (var _b = 0, _c = config.selectors; _b < _c.length; _b++) {
            var selector = _c[_b];
            if (selector) {
                selectorArray.push(selector);
            }
        }
    }
    var store = new (createGenericStore(config.name, funcArray, selectorArray, config.features))();
    for (var _d = 0, _e = config.features; _d < _e.length; _d++) {
        var feature = _e[_d];
        var effectService = getEffectService(feature, store.baseActions, config.name, config.route, config.label);
        if (effectService) {
            effectsList.push(effectService);
        }
    }
    var facade = (0, generic_facade_1.createGenericFacade)(config.name, StoreToken, config.features, entity);
    return {
        facade: facade,
        facadeToken: FacadeToken,
        storeToken: StoreToken,
        store: store,
        effects: effectsList.map(function (pair) { return pair.effect; }),
        services: effectsList.map(function (pair) { return ({
            provide: pair.serviceToken,
            useClass: pair.service,
        }); }),
    };
}
exports.getStoreFeatures = getStoreFeatures;
