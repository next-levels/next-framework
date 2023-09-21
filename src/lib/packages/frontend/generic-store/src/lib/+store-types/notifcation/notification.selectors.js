"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationSelectorsFeature = exports.createNotificationSelectors = void 0;
var store_1 = require("@ngrx/store");
function createNotificationSelectors(featureKey, entityAdapter) {
    var getEntityState = (0, store_1.createFeatureSelector)(featureKey);
    var getEntityNotificationCount = (0, store_1.createSelector)(getEntityState, function (state) { return state.unReadCount; });
    var getEntityNotificationUpdated = (0, store_1.createSelector)(getEntityState, function (state) { return state.updated; });
    return {
        getEntityNotificationCount: getEntityNotificationCount,
        getEntityNotificationUpdated: getEntityNotificationUpdated
    };
}
exports.createNotificationSelectors = createNotificationSelectors;
function createNotificationSelectorsFeature(featureKey, entityAdapter) {
    var getFeatureState = (0, store_1.createFeatureSelector)(featureKey);
    var getEntityState = (0, store_1.createSelector)(getFeatureState, function (state) { return state.notification; });
    var getEntityNotificationCount = (0, store_1.createSelector)(getEntityState, function (state) { return state.unReadCount; });
    var getEntityNotificationUpdated = (0, store_1.createSelector)(getEntityState, function (state) { return state.updated; });
    return {
        getEntityNotificationCount: getEntityNotificationCount,
        getEntityNotificationUpdated: getEntityNotificationUpdated
    };
}
exports.createNotificationSelectorsFeature = createNotificationSelectorsFeature;
