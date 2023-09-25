"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationEffectServicePair = exports.createNotificationFacade = exports.createNotificationFacade2 = exports.createNotificationEffects = exports.createNotificationStore = exports.createNotificationService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const store_1 = require("@ngrx/store");
const effects_1 = require("@ngrx/effects");
const notification_store_1 = require("./notification.store");
const notification_effects_1 = require("./notification.effects");
const notification_facede_1 = require("./notification.facede");
function createNotificationService(modelUrl) {
    let ModuleService = class ModuleService {
        constructor(_http) {
            this._http = _http;
        }
        resetEntity() { }
        setEntity(entity) { }
    };
    ModuleService = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], ModuleService);
    return ModuleService;
}
exports.createNotificationService = createNotificationService;
function createNotificationStore(modelName) {
    class ModuleStore extends notification_store_1.NotificationStore {
        constructor() {
            super(modelName);
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
    return ModuleStore;
}
exports.createNotificationStore = createNotificationStore;
function createNotificationEffects(serviceToken, actions, modelName) {
    let ModuleEffectsClass = class ModuleEffectsClass extends notification_effects_1.NotificationEffects {
        constructor(actions$, service) {
            super(actions$, actions, modelName);
            this.actions$ = actions$;
            this.service = service;
        }
    };
    ModuleEffectsClass = tslib_1.__decorate([
        (0, core_1.Injectable)(),
        tslib_1.__param(1, (0, core_1.Inject)(serviceToken)),
        tslib_1.__metadata("design:paramtypes", [effects_1.Actions, Object])
    ], ModuleEffectsClass);
    return ModuleEffectsClass;
}
exports.createNotificationEffects = createNotificationEffects;
function createNotificationFacade2(storeClass, actions, selectors) {
    return new notification_facede_1.NotificationFacade(storeClass, actions, selectors);
    let ModuleFacade = class ModuleFacade extends notification_facede_1.NotificationFacade {
        constructor(store) {
            super(store, actions, selectors);
            this.store = store;
        }
    };
    ModuleFacade = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [store_1.Store])
    ], ModuleFacade);
    return ModuleFacade;
}
exports.createNotificationFacade2 = createNotificationFacade2;
function createNotificationFacade(storeClass, actions, selectors) {
    let ModuleFacade = class ModuleFacade extends notification_facede_1.NotificationFacade {
        constructor(store) {
            super(store, actions, selectors);
            this.store = store;
        }
        setEntity(entity) {
            this.store.dispatch(this.baseActions.setEntity({ payload: entity }));
        }
    };
    ModuleFacade = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__metadata("design:paramtypes", [store_1.Store])
    ], ModuleFacade);
    return new ModuleFacade(storeClass); // Create and return instance of ModuleFacade, not the class itself
}
exports.createNotificationFacade = createNotificationFacade;
function createNotificationEffectServicePair(config) {
    const service = createNotificationService(config.route);
    const effect = createNotificationEffects(config.serviceToken, config.actions, config.label);
    return {
        serviceToken: config.serviceToken,
        service,
        effect,
    };
}
exports.createNotificationEffectServicePair = createNotificationEffectServicePair;
//# sourceMappingURL=notification.factory.js.map