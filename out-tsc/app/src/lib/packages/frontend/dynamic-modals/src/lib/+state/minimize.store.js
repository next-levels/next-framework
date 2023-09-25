"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeStore = void 0;
const src_1 = require("../../../../generic-store/src");
class MinimizeStore extends src_1.BaseStore {
    constructor() {
        super('minimized');
        this.baseReducers = (0, src_1.createGenericReducer)(this.entityName, this.baseActions, this.adapter);
    }
    static getReducers() {
        return new MinimizeStore().baseReducers;
    }
    static getActions() {
        return new MinimizeStore().baseActions;
    }
    static getSelectors() {
        return new MinimizeStore().baseSelectors;
    }
}
exports.MinimizeStore = MinimizeStore;
//# sourceMappingURL=minimize.store.js.map