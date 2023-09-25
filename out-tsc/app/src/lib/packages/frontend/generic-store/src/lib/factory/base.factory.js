"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBaseEffectServicePair = exports.createBaseFacadeInstance = exports.createBaseFacade = exports.createLocalStorageEffects = exports.createBaseEffects = exports.createStore = exports.createBaseService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const store_1 = require("@ngrx/store");
const effects_1 = require("@ngrx/effects");
const local_storage_effects_1 = require("../+state/local-storage.effects");
const core_2 = require("@ngx-translate/core");
const base_store_1 = require("./base.store");
const generic_reducers_1 = require("../+state/generic.reducers");
const generic_effects_1 = require("../+state/generic.effects");
const base_facede_1 = require("./base.facede");
function createBaseService(modelUrl) {
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
exports.createBaseService = createBaseService;
function createStore(modelName) {
    class GenericStore extends base_store_1.BaseStore {
        constructor() {
            super(modelName);
            this.baseReducers = (0, generic_reducers_1.createGenericReducer)(this.entityName, this.baseActions, this.adapter);
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
exports.createStore = createStore;
function createBaseEffects(serviceToken, actions, name, label = '') {
    let GenericEffectsClass = class GenericEffectsClass extends generic_effects_1.GenericEffects {
        constructor(actions$, service, translateService) {
            super(actions$, service, actions, name, label, translateService);
            this.actions$ = actions$;
            this.service = service;
            this.translateService = translateService;
        }
    };
    GenericEffectsClass = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__param(1, (0, core_1.Inject)(serviceToken)),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions, Object, core_2.TranslateService])
    ], GenericEffectsClass);
    return GenericEffectsClass;
}
exports.createBaseEffects = createBaseEffects;
function createLocalStorageEffects(serviceToken, storeToken, modelName) {
    let GenericEffectsClass = class GenericEffectsClass extends local_storage_effects_1.LocalStorageEffects {
        constructor(actions$, service, store) {
            super(actions$, service, store.baseActions, modelName);
            this.actions$ = actions$;
            this.service = service;
            this.store = store;
        }
    };
    GenericEffectsClass = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__param(1, (0, core_1.Inject)(serviceToken)),
        tslib_1.__param(2, (0, core_1.Inject)(storeToken)),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions, Object, base_store_1.BaseStore])
    ], GenericEffectsClass);
    return GenericEffectsClass;
}
exports.createLocalStorageEffects = createLocalStorageEffects;
function createBaseFacade(storeClass, actions, selectors) {
    let GenericFacade = class GenericFacade extends base_facede_1.BaseFacade {
        constructor(store) {
            super(store, actions, selectors);
            this.store = store;
        }
    };
    GenericFacade = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [store_1.Store])
    ], GenericFacade);
    return GenericFacade;
}
exports.createBaseFacade = createBaseFacade;
function createBaseFacadeInstance(storeClass, actions, selectors) {
    let GenericFacade = class GenericFacade extends base_facede_1.BaseFacade {
        constructor(store) {
            super(store, actions, selectors);
            this.store = store;
        }
    };
    GenericFacade = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [store_1.Store])
    ], GenericFacade);
    return new GenericFacade(storeClass);
}
exports.createBaseFacadeInstance = createBaseFacadeInstance;
function createBaseEffectServicePair(config) {
    const service = createBaseService(config.route);
    const effect = createBaseEffects(config.serviceToken, config.actions, config.name, config.label);
    return {
        serviceToken: config.serviceToken,
        service,
        effect,
    };
}
exports.createBaseEffectServicePair = createBaseEffectServicePair;
//# sourceMappingURL=base.factory.js.map