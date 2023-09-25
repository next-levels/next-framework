"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStore = void 0;
const entity_1 = require("@ngrx/entity");
const generic_actions_1 = require("../+state/generic.actions");
const generic_selectors_1 = require("../+state/generic.selectors");
const generic_reducers_1 = require("../+state/generic.reducers");
class BaseStore {
    constructor(entityName) {
        this.entityName = entityName;
        this.adapter = (0, entity_1.createEntityAdapter)();
        this.featureKey = entityName;
        this.baseActions = (0, generic_actions_1.createGenericActions)(entityName);
        this.baseSelectors = (0, generic_selectors_1.createGenericSelectors)(entityName, this.adapter);
    }
    get baseReducer() {
        return (0, generic_reducers_1.createGenericReducer)(this.entityName, this.baseActions, this.adapter);
    }
}
exports.BaseStore = BaseStore;
//# sourceMappingURL=base.store.js.map