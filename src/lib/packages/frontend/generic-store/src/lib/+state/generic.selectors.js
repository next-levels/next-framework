"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericSelectorsFeature = exports.createGenericSelectors = void 0;
var store_1 = require("@ngrx/store");
function createGenericSelectors(featureKey, entityAdapter) {
    var getEntityState = (0, store_1.createFeatureSelector)(featureKey);
    var _a = entityAdapter.getSelectors(getEntityState), getEntities = _a.selectAll, getEntityEntitiesOriginal = _a.selectEntities;
    var getEntityEntities = (0, store_1.createSelector)(getEntityEntitiesOriginal, function (entitiesDictionary) {
        return Object.fromEntries(Object.entries(entitiesDictionary).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [
                parseInt(key),
                value,
            ];
        }));
    });
    var getEntityLoading = (0, store_1.createSelector)(getEntityState, function (state) { return state.loading; });
    var getPagination = (0, store_1.createSelector)(getEntityState, function (state) {
        return state.pagination_meta;
    });
    var getSelectedEntityId = (0, store_1.createSelector)(getEntityState, function (state) { return state.selectedEntityId; });
    var getIsLoading = (0, store_1.createSelector)(getEntityState, function (state) { return state.loading; });
    var getSelectedEntity = (0, store_1.createSelector)(getEntityEntities, getSelectedEntityId, function (entitiesDictionary, id) {
        var _a;
        return (_a = entitiesDictionary[+id]) !== null && _a !== void 0 ? _a : null;
    });
    return {
        getEntities: getEntities,
        getEntityLoading: getEntityLoading,
        getPagination: getPagination,
        getEntityEntities: getEntityEntities,
        getSelectedEntityId: getSelectedEntityId,
        getSelectedEntity: getSelectedEntity,
        getIsLoading: getIsLoading,
    };
}
exports.createGenericSelectors = createGenericSelectors;
function createGenericSelectorsFeature(featureKey, entityAdapter) {
    var getFeatureState = (0, store_1.createFeatureSelector)(featureKey);
    var getEntityState = (0, store_1.createSelector)(getFeatureState, function (state) { return state.base; });
    var _a = entityAdapter.getSelectors(getEntityState), getEntities = _a.selectAll, getEntityEntitiesOriginal = _a.selectEntities;
    var getEntityEntities = (0, store_1.createSelector)(getEntityEntitiesOriginal, function (entitiesDictionary) {
        return Object.fromEntries(Object.entries(entitiesDictionary).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [
                parseInt(key),
                value,
            ];
        }));
    });
    var getEntityLoading = (0, store_1.createSelector)(getEntityState, function (state) { return state.loading; });
    var getPagination = (0, store_1.createSelector)(getEntityState, function (state) {
        return state.pagination_meta;
    });
    var getSelectedEntityId = (0, store_1.createSelector)(getEntityState, function (state) { return state.selectedEntityId; });
    var getIsLoading = (0, store_1.createSelector)(getEntityState, function (state) { return state.loading; });
    var getSelectedEntity = (0, store_1.createSelector)(getEntityEntities, getSelectedEntityId, function (entitiesDictionary, id) {
        var _a;
        return (_a = entitiesDictionary[+id]) !== null && _a !== void 0 ? _a : null;
    });
    return {
        getEntities: getEntities,
        getEntityLoading: getEntityLoading,
        getPagination: getPagination,
        getEntityEntities: getEntityEntities,
        getSelectedEntityId: getSelectedEntityId,
        getSelectedEntity: getSelectedEntity,
        getIsLoading: getIsLoading,
    };
}
exports.createGenericSelectorsFeature = createGenericSelectorsFeature;
