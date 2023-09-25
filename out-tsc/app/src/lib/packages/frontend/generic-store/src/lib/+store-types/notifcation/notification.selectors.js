"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationSelectorsFeature = exports.createNotificationSelectors = void 0;
const store_1 = require("@ngrx/store");
function createNotificationSelectors(featureKey, entityAdapter) {
    const getEntityState = (0, store_1.createFeatureSelector)(featureKey);
    const getEntityNotificationCount = (0, store_1.createSelector)(getEntityState, (state) => state.unReadCount);
    const getEntityNotificationUpdated = (0, store_1.createSelector)(getEntityState, (state) => state.updated);
    return {
        getEntityNotificationCount,
        getEntityNotificationUpdated
    };
}
exports.createNotificationSelectors = createNotificationSelectors;
function createNotificationSelectorsFeature(featureKey, entityAdapter) {
    const getFeatureState = (0, store_1.createFeatureSelector)(featureKey);
    const getEntityState = (0, store_1.createSelector)(getFeatureState, (state) => state.notification);
    const getEntityNotificationCount = (0, store_1.createSelector)(getEntityState, (state) => state.unReadCount);
    const getEntityNotificationUpdated = (0, store_1.createSelector)(getEntityState, (state) => state.updated);
    return {
        getEntityNotificationCount,
        getEntityNotificationUpdated
    };
}
exports.createNotificationSelectorsFeature = createNotificationSelectorsFeature;
//# sourceMappingURL=notification.selectors.js.map