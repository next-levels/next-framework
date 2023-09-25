"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStoreModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const effects_1 = require("@ngrx/effects");
const src_1 = require("../../../angular-commons/src");
const src_2 = require("../../../../shared/generics/src");
const generic_factory_1 = require("./factory/generic.factory");
let RootStoreModule = class RootStoreModule {
    static forFeature(model) {
        const providers = [];
        const imports = [];
        let config = src_2.META.getOptionsByModel(model.prototype);
        const injector = core_1.Injector.create({
            providers: [{ provide: src_1.EnvironmentStorageService, deps: [] }],
        });
        const storedEnvironment = injector.get(src_1.EnvironmentStorageService);
        const apiUrl = `${storedEnvironment.baseUrl}/${config.url}`; // wird später aktualisiert
        const store = (0, generic_factory_1.getStoreFeatures)(model, {
            ...config,
            route: apiUrl,
        });
        providers.push({
            provide: store.storeToken,
            useValue: store.store,
        });
        providers.push({
            provide: store.facadeToken,
            useClass: store.facade,
            deps: [store_1.Store, store.storeToken],
        });
        providers.push(...store.services, ...store.effects);
        let DynamicStoreModule = class DynamicStoreModule {
            constructor(registry, NGRXstore) {
                this.registry = registry;
                this.NGRXstore = NGRXstore;
                this.registry.register(model, new store.facade(NGRXstore, store.store));
            }
        };
        DynamicStoreModule = tslib_1.__decorate([
            (0, core_1.NgModule)({
                imports: [
                    store_1.StoreModule.forFeature(store.store.featureKey, store.store.baseReducers),
                    effects_1.EffectsModule.forFeature([...store.effects]),
                ],
            }),
            tslib_1.__metadata("design:paramtypes", [src_1.InstanceRegistryService,
                store_1.Store])
        ], DynamicStoreModule);
        return {
            ngModule: DynamicStoreModule,
            providers,
        };
    }
};
exports.RootStoreModule = RootStoreModule;
exports.RootStoreModule = RootStoreModule = tslib_1.__decorate([
    (0, core_1.NgModule)({})
], RootStoreModule);
//# sourceMappingURL=root-store.module.js.map