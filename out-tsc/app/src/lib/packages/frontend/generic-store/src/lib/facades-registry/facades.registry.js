"use strict";
var FacadeRegistry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacadeRegistry = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let FacadeRegistry = class FacadeRegistry {
    static { FacadeRegistry_1 = this; }
    static { this.facades = {}; }
    static registerFacade(name, facade) {
        FacadeRegistry_1.facades[name] = facade;
    }
    static getFacade(name) {
        return FacadeRegistry_1.facades[name];
    }
};
exports.FacadeRegistry = FacadeRegistry;
exports.FacadeRegistry = FacadeRegistry = FacadeRegistry_1 = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    })
], FacadeRegistry);
//# sourceMappingURL=facades.registry.js.map