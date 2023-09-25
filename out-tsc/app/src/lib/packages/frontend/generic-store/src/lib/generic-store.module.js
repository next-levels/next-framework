"use strict";
var GenericStoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericStoreModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const effects_1 = require("@ngrx/effects");
let GenericStoreModule = GenericStoreModule_1 = class GenericStoreModule {
    static forFeature(featureKey, reducer, effects) {
        return {
            ngModule: GenericStoreModule_1,
            imports: [
                store_1.StoreModule.forFeature(featureKey, reducer),
                effects_1.EffectsModule.forFeature(effects),
            ],
        };
    }
};
exports.GenericStoreModule = GenericStoreModule;
exports.GenericStoreModule = GenericStoreModule = GenericStoreModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({})
], GenericStoreModule);
//# sourceMappingURL=generic-store.module.js.map