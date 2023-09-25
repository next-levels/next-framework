"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationReducerState = exports.createNotificationReducer = void 0;
const store_1 = require("@ngrx/store");
function createNotificationReducer(entityName, actions, entityAdapter) {
    {
        return (0, store_1.createReducer)(entityAdapter.getInitialState({ unReadCount: 0, updated: Date.now() }), (0, store_1.on)(actions.setEntity, (state, payload) => {
            return entityAdapter.addOne(payload.payload, {
                ...state,
                unReadCount: state.unReadCount + 1,
            });
        }), (0, store_1.on)(actions.resetCount, (state) => ({
            ...state,
            updated: Date.now(),
            unReadCount: 0,
        })));
    }
}
exports.createNotificationReducer = createNotificationReducer;
function createNotificationReducerState(entityName, actions, entityAdapter) {
    {
        return (0, store_1.createReducer)(entityAdapter.getInitialState(), (0, store_1.on)(actions.setEntity, (state, payload) => {
            return entityAdapter.addOne(payload.payload, {
                ...state,
                unReadCount: state.unReadCount + 1,
            });
        }), (0, store_1.on)(actions.resetCount, (state) => ({
            ...state,
            updated: Date.now(),
            unReadCount: 0,
        })));
    }
}
exports.createNotificationReducerState = createNotificationReducerState;
//# sourceMappingURL=notification.reducers.js.map