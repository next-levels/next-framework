"use strict";
var RootStoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStoreModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let RootStoreModule = RootStoreModule_1 = class RootStoreModule {
    static forRoot(backendOrFrontend) {
        return {
            ngModule: RootStoreModule_1,
            providers: [
                { provide: 'backendOrFrontend', useValue: backendOrFrontend }
            ]
        };
    }
};
exports.RootStoreModule = RootStoreModule;
exports.RootStoreModule = RootStoreModule = RootStoreModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({})
], RootStoreModule);
//# sourceMappingURL=root-generic-store.module.js.map