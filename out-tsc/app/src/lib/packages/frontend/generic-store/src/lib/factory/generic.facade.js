"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const notification_factory_1 = require("../+store-types/notifcation/notification.factory");
const base_factory_1 = require("./base.factory");
function createGenericFacade(modelName, storeToken, features = ['notification', 'basic'], entity) {
    let GenericFacade = class GenericFacade {
        constructor(store, genericStore) {
            this.store = store;
            this.genericStore = genericStore;
            if (features.includes('notification')) {
                this.notification = (0, notification_factory_1.createNotificationFacade)(store, genericStore.baseActions, genericStore.baseSelectors);
            }
            this.base = (0, base_factory_1.createBaseFacadeInstance)(store, genericStore.baseActions, genericStore.baseSelectors);
            const EntityConstructor = entity;
            const dynamicFilters = EntityConstructor.dynamicFilters;
            const dynamicFilterMap = {};
            if (Array.isArray(dynamicFilters)) {
                for (const filter of dynamicFilters) {
                    const { key, func } = filter;
                    const dynamicSelector = (0, store_1.createSelector)(genericStore.baseSelectors.getEntities, func);
                    dynamicFilterMap[key] = this.store.select(dynamicSelector);
                }
            }
            this.selectors = dynamicFilterMap;
        }
    };
    GenericFacade = tslib_1.__decorate([
        (0, core_1.Injectable)({
            providedIn: 'root',
        }),
        tslib_1.__param(1, (0, core_1.Inject)(storeToken)),
        tslib_1.__metadata("design:paramtypes", [store_1.Store, Object])
    ], GenericFacade);
    return GenericFacade;
}
exports.createGenericFacade = createGenericFacade;
//# sourceMappingURL=generic.facade.js.map