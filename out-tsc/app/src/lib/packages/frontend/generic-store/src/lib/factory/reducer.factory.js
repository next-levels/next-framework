"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducers = void 0;
const store_1 = require("@ngrx/store");
const base_reducers_1 = require("../+state/base.reducers");
const notification_reducers_1 = require("../+store-types/notifcation/notification.reducers");
function createReducers(keys, entityName, baseActions, baseEntityAdapter) {
    const reducers = {};
    for (const key of keys) {
        let reducer;
        switch (key) {
            case 'base':
                reducer = (0, base_reducers_1.createBaseReducers)(entityName, baseActions, baseEntityAdapter);
                break;
            case 'notification':
                reducer = (0, notification_reducers_1.createNotificationReducer)(entityName, baseActions, baseEntityAdapter);
                break;
            // add more cases as necessary
            default:
                console.info(`No reducer found for key "${key}"`);
                break;
        }
        if (reducer) {
            reducers[key] = reducer;
        }
    }
    return (0, store_1.combineReducers)(reducers);
}
exports.createReducers = createReducers;
//# sourceMappingURL=reducer.factory.js.map