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
exports.createNotificationReducerState = exports.createNotificationReducer = void 0;
var store_1 = require("@ngrx/store");
function createNotificationReducer(entityName, actions, entityAdapter) {
    {
        return (0, store_1.createReducer)(entityAdapter.getInitialState({ unReadCount: 0, updated: Date.now() }), (0, store_1.on)(actions.setEntity, function (state, payload) {
            return entityAdapter.addOne(payload.payload, __assign(__assign({}, state), { unReadCount: state.unReadCount + 1 }));
        }), (0, store_1.on)(actions.resetCount, function (state) { return (__assign(__assign({}, state), { updated: Date.now(), unReadCount: 0 })); }));
    }
}
exports.createNotificationReducer = createNotificationReducer;
function createNotificationReducerState(entityName, actions, entityAdapter) {
    {
        return (0, store_1.createReducer)(entityAdapter.getInitialState(), (0, store_1.on)(actions.setEntity, function (state, payload) {
            return entityAdapter.addOne(payload.payload, __assign(__assign({}, state), { unReadCount: state.unReadCount + 1 }));
        }), (0, store_1.on)(actions.resetCount, function (state) { return (__assign(__assign({}, state), { updated: Date.now(), unReadCount: 0 })); }));
    }
}
exports.createNotificationReducerState = createNotificationReducerState;
