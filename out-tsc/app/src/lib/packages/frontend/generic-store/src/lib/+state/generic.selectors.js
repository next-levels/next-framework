"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericSelectorsFeature = exports.createGenericSelectors = void 0;
const store_1 = require("@ngrx/store");
function createGenericSelectors(featureKey, entityAdapter) {
    const getEntityState = (0, store_1.createFeatureSelector)(featureKey);
    const { selectAll: getEntities, selectEntities: getEntityEntitiesOriginal } = entityAdapter.getSelectors(getEntityState);
    const getEntityEntities = (0, store_1.createSelector)(getEntityEntitiesOriginal, (entitiesDictionary) => {
        return Object.fromEntries(Object.entries(entitiesDictionary).map(([key, value]) => [
            parseInt(key),
            value,
        ]));
    });
    const getEntityLoading = (0, store_1.createSelector)(getEntityState, (state) => state.loading);
    const getPagination = (0, store_1.createSelector)(getEntityState, (state) => {
        return state.pagination_meta;
    });
    const getSelectedEntityId = (0, store_1.createSelector)(getEntityState, (state) => state.selectedEntityId);
    const getIsLoading = (0, store_1.createSelector)(getEntityState, (state) => state.loading);
    const getSelectedEntity = (0, store_1.createSelector)(getEntityEntities, getSelectedEntityId, (entitiesDictionary, id) => {
        return entitiesDictionary[+id] ?? null;
    });
    return {
        getEntities,
        getEntityLoading,
        getPagination,
        getEntityEntities,
        getSelectedEntityId,
        getSelectedEntity,
        getIsLoading,
    };
}
exports.createGenericSelectors = createGenericSelectors;
function createGenericSelectorsFeature(featureKey, entityAdapter) {
    const getFeatureState = (0, store_1.createFeatureSelector)(featureKey);
    const getEntityState = (0, store_1.createSelector)(getFeatureState, (state) => state.base);
    const { selectAll: getEntities, selectEntities: getEntityEntitiesOriginal } = entityAdapter.getSelectors(getEntityState);
    const getEntityEntities = (0, store_1.createSelector)(getEntityEntitiesOriginal, (entitiesDictionary) => {
        return Object.fromEntries(Object.entries(entitiesDictionary).map(([key, value]) => [
            parseInt(key),
            value,
        ]));
    });
    const getEntityLoading = (0, store_1.createSelector)(getEntityState, (state) => state.loading);
    const getPagination = (0, store_1.createSelector)(getEntityState, (state) => {
        return state.pagination_meta;
    });
    const getSelectedEntityId = (0, store_1.createSelector)(getEntityState, (state) => state.selectedEntityId);
    const getIsLoading = (0, store_1.createSelector)(getEntityState, (state) => state.loading);
    const getSelectedEntity = (0, store_1.createSelector)(getEntityEntities, getSelectedEntityId, (entitiesDictionary, id) => {
        return entitiesDictionary[+id] ?? null;
    });
    return {
        getEntities,
        getEntityLoading,
        getPagination,
        getEntityEntities,
        getSelectedEntityId,
        getSelectedEntity,
        getIsLoading,
    };
}
exports.createGenericSelectorsFeature = createGenericSelectorsFeature;
//# sourceMappingURL=generic.selectors.js.map