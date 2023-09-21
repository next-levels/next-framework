"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericInitialState = exports.createGenericAdapter = void 0;
var entity_1 = require("@ngrx/entity");
function createGenericAdapter() {
    return (0, entity_1.createEntityAdapter)();
}
exports.createGenericAdapter = createGenericAdapter;
function createGenericInitialState(entityActions, entityAdapter) {
    return __assign(__assign(__assign({}, entityAdapter.getInitialState()), entityActions), { error: '', pagination_meta: null, selectedEntityId: '', loading: false });
}
exports.createGenericInitialState = createGenericInitialState;
