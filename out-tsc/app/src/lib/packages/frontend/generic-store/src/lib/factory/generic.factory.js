"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreFeatures = exports.createGenericStore = exports.createService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const entity_1 = require("@ngrx/entity");
const reducer_factory_1 = require("./reducer.factory");
const generic_facade_1 = require("./generic.facade");
const src_1 = require("../../../../../shared/generics/src");
const base_factory_1 = require("./base.factory");
const notification_factory_1 = require("../+store-types/notifcation/notification.factory");
const generic_actions_1 = require("../+state/generic.actions");
const notification_actions_1 = require("../+store-types/notifcation/notification.actions");
const generic_selectors_1 = require("../+state/generic.selectors");
const notification_selectors_1 = require("../+store-types/notifcation/notification.selectors");
function createService(modelUrl) {
    let GenericService = class GenericService {
        constructor(_http) {
            this._http = _http;
        }
        getEntity(id) {
            return this._http.get(modelUrl + '/' + id);
        }
        getAll() {
            return this._http.get(modelUrl);
        }
        findByFilter(filter) {
            return this._http.get(`${modelUrl}/filter`, {
                params: { ...filter },
            });
        }
        addEntity(data) {
            return this._http.post(modelUrl, data);
        }
        deleteEntity(entity) {
            return this._http.delete(modelUrl + '/' + entity.id);
        }
        updateEntity(id, data) {
            return this._http.patch(modelUrl + '/' + id, data);
        }
    };
    GenericService = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], GenericService);
    return GenericService;
}
exports.createService = createService;
function createGenericStore(modelName, funcArray, selectorArray, features = ['notification', 'basic']) {
    class GenericStore {
        constructor() {
            this.adapter = (0, entity_1.createEntityAdapter)();
            this.featureKey = modelName;
            let actionInstances = [];
            for (let func of funcArray) {
                actionInstances.push(func(modelName));
            }
            this.baseActions = actionInstances.reduce((combinedActions, actions) => ({ ...combinedActions, ...actions }), {});
            let selectorInstances = [];
            for (let func of selectorArray) {
                selectorInstances.push(func(modelName, this.adapter));
            }
            this.baseSelectors = selectorInstances.reduce((combinedSelectors, selectors) => ({
                ...combinedSelectors,
                ...selectors,
            }), {});
            this.baseReducers = (0, reducer_factory_1.createReducers)(features, modelName, this.baseActions, this.adapter);
        }
        static getReducers() {
            return new this().baseReducers;
        }
        static getActions() {
            return new this().baseActions;
        }
        static getSelectors() {
            return new this().baseSelectors;
        }
    }
    return GenericStore;
}
exports.createGenericStore = createGenericStore;
function getEffectService(feature, actions, name, route, label = '') {
    const serviceToken = new core_1.InjectionToken(`${name}${feature}Service`);
    const config = {
        name,
        route,
        actions,
        serviceToken,
        label,
    };
    switch (feature) {
        case 'base':
            return (0, base_factory_1.createBaseEffectServicePair)(config);
        case 'notification':
            return (0, notification_factory_1.createNotificationEffectServicePair)(config);
        default:
            throw new Error(`Feature ${feature} not found`);
    }
}
function getAction(feature) {
    switch (feature) {
        case 'base':
            return generic_actions_1.createGenericActions;
        case 'notification':
            return notification_actions_1.createNotificationActions;
        default:
            throw new Error(`Feature ${feature} not found`);
    }
}
function getSelector(feature) {
    switch (feature) {
        case 'base':
            return generic_selectors_1.createGenericSelectorsFeature;
        case 'notification':
            return notification_selectors_1.createNotificationSelectorsFeature;
        default:
            throw new Error(`Feature ${feature} not found`);
    }
}
function getStoreFeatures(entity, config) {
    const funcArray = [];
    const selectorArray = [];
    const effectsList = [];
    const StoreToken = new core_1.InjectionToken(name + 'Store');
    const FacadeToken = new core_1.InjectionToken(name + 'Facade');
    config.name = src_1.META.getNameByModel(entity.prototype);
    for (const feature of config.features) {
        const action = getAction(feature);
        if (action) {
            funcArray.push(action);
        }
        const selector = getSelector(feature);
        if (selector) {
            selectorArray.push(selector);
        }
    }
    if (config.selectors) {
        for (const selector of config.selectors) {
            if (selector) {
                selectorArray.push(selector);
            }
        }
    }
    const store = new (createGenericStore(config.name, funcArray, selectorArray, config.features))();
    for (const feature of config.features) {
        const effectService = getEffectService(feature, store.baseActions, config.name, config.route, config.label);
        if (effectService) {
            effectsList.push(effectService);
        }
    }
    const facade = (0, generic_facade_1.createGenericFacade)(config.name, StoreToken, config.features, entity);
    return {
        facade: facade,
        facadeToken: FacadeToken,
        storeToken: StoreToken,
        store: store,
        effects: effectsList.map((pair) => pair.effect),
        services: effectsList.map((pair) => ({
            provide: pair.serviceToken,
            useClass: pair.service,
        })),
    };
}
exports.getStoreFeatures = getStoreFeatures;
//# sourceMappingURL=generic.factory.js.map