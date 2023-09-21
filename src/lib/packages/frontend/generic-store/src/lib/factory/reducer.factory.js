"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReducers = void 0;
var store_1 = require("@ngrx/store");
var base_reducers_1 = require("../+state/base.reducers");
var notification_reducers_1 = require("../+store-types/notifcation/notification.reducers");
function createReducers(keys, entityName, baseActions, baseEntityAdapter) {
    var reducers = {};
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var reducer = void 0;
        switch (key) {
            case 'base':
                reducer = (0, base_reducers_1.createBaseReducers)(entityName, baseActions, baseEntityAdapter);
                break;
            case 'notification':
                reducer = (0, notification_reducers_1.createNotificationReducer)(entityName, baseActions, baseEntityAdapter);
                break;
            // add more cases as necessary
            default:
                console.info("No reducer found for key \"".concat(key, "\""));
                break;
        }
        if (reducer) {
            reducers[key] = reducer;
        }
    }
    return (0, store_1.combineReducers)(reducers);
}
exports.createReducers = createReducers;
