"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericInitialState = exports.createGenericAdapter = void 0;
const entity_1 = require("@ngrx/entity");
function createGenericAdapter() {
    return (0, entity_1.createEntityAdapter)();
}
exports.createGenericAdapter = createGenericAdapter;
function createGenericInitialState(entityActions, entityAdapter) {
    return {
        ...entityAdapter.getInitialState(),
        ...entityActions,
        error: '',
        pagination_meta: null,
        selectedEntityId: '',
        loading: false,
    };
}
exports.createGenericInitialState = createGenericInitialState;
//# sourceMappingURL=generic.helper.js.map