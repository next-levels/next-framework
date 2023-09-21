"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStore = void 0;
var entity_1 = require("@ngrx/entity");
var generic_actions_1 = require("../+state/generic.actions");
var generic_selectors_1 = require("../+state/generic.selectors");
var generic_reducers_1 = require("../+state/generic.reducers");
var BaseStore = /** @class */ (function () {
    function BaseStore(entityName) {
        this.entityName = entityName;
        this.adapter = (0, entity_1.createEntityAdapter)();
        this.featureKey = entityName;
        this.baseActions = (0, generic_actions_1.createGenericActions)(entityName);
        this.baseSelectors = (0, generic_selectors_1.createGenericSelectors)(entityName, this.adapter);
    }
    Object.defineProperty(BaseStore.prototype, "baseReducer", {
        get: function () {
            return (0, generic_reducers_1.createGenericReducer)(this.entityName, this.baseActions, this.adapter);
        },
        enumerable: false,
        configurable: true
    });
    return BaseStore;
}());
exports.BaseStore = BaseStore;
