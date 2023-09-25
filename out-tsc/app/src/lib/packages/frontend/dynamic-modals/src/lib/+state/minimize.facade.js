"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeFacade = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const minimize_store_1 = require("./minimize.store");
const src_1 = require("../../../../generic-store/src");
let MinimizeFacade = class MinimizeFacade extends src_1.BaseFacade {
    constructor(store) {
        super(store, minimize_store_1.MinimizeStore.getActions(), minimize_store_1.MinimizeStore.getSelectors());
        this.store = store;
    }
    export(modals) {
        this.store.dispatch(this.baseActions.exportEntities({ payload: { modals } }));
    }
};
exports.MinimizeFacade = MinimizeFacade;
exports.MinimizeFacade = MinimizeFacade = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [store_1.Store])
], MinimizeFacade);
//# sourceMappingURL=minimize.facade.js.map