"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericReducerState = exports.createGenericReducer = void 0;
const store_1 = require("@ngrx/store");
function createGenericReducer(entityName, actions, entityAdapter) {
    {
        return (0, store_1.createReducer)(entityAdapter.getInitialState(), (0, store_1.on)(actions.load, (state) => ({
            ...state,
            loaded: false,
            error: null,
        })), (0, store_1.on)(actions.loadSuccess, (state, { payload: entities }) => {
            return entityAdapter.setAll(entities, state);
        }), (0, store_1.on)(actions.loadFail, (state, { error }) => ({
            ...state,
            loaded: false,
            loading: false,
            error: error,
        })), 
        // Filtered
        (0, store_1.on)(actions.loadEntitiesFiltered, (state) => ({
            ...state,
            loaded: false,
            loading: true,
            error: null,
        })), (0, store_1.on)(actions.loadEntitiesFilteredSuccess, (state, { payload: paginated }) => {
            return entityAdapter.setAll(paginated.data, {
                ...state,
                loaded: true,
                pagination_meta: paginated.meta,
                loading: false,
            });
        }), (0, store_1.on)(actions.loadEntitiesFilteredFail, (state, { error }) => entityAdapter.removeAll({
            ...state,
            error,
            loaded: true,
            loading: false,
        })), 
        // Select
        (0, store_1.on)(actions.selectEntity, (state, { payload }) => {
            return {
                ...state,
                selectedEntityId: payload.entityId,
                loaded: false,
                loading: true,
            };
        }), (0, store_1.on)(actions.selectEntitySuccess, (state, { payload }) => {
            return entityAdapter.setOne(payload.entity, {
                ...state,
                loaded: true,
                loading: false,
            });
        }), 
        // Add
        (0, store_1.on)(actions.addEntity, (state) => ({
            ...state,
            loaded: false,
            loading: true,
            error: null,
        })), (0, store_1.on)(actions.addEntitySuccess, (state, { payload }) => {
            const entity = payload.entity;
            return entityAdapter.addOne(entity, {
                ...state,
                loading: false,
            });
        }), (0, store_1.on)(actions.addEntityFail, (state, { error }) => ({
            ...state,
            loading: false,
        })), 
        // Edit
        (0, store_1.on)(actions.editEntity, (state, { payload: { entity } }) => {
            return entityAdapter.updateOne({
                id: entity.id,
                changes: entity.changes,
            }, {
                ...state,
                loading: true,
            });
        }), (0, store_1.on)(actions.editEntitySuccess, (state) => ({
            ...state,
            loading: false,
        })), (0, store_1.on)(actions.editEntityFail, (state, { error }) => ({
            ...state,
            loading: false,
        })), 
        // Delete
        (0, store_1.on)(actions.deleteEntity, (state) => ({
            ...state,
            loading: true,
        })), (0, store_1.on)(actions.deleteEntitySuccess, (state, { payload }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return entityAdapter.removeOne(payload.entity.id, {
                ...state,
                loading: false,
            });
        }), (0, store_1.on)(actions.deleteEntityFail, (state, { error }) => ({
            ...state,
            loading: false,
        })), 
        // Export
        (0, store_1.on)(actions.exportEntities, (state) => ({
            ...state,
            loading: true,
        })), (0, store_1.on)(actions.exportEntitiesSuccess, (state) => ({
            ...state,
            loading: false,
        })), (0, store_1.on)(actions.exportEntitiesFail, (state) => ({
            ...state,
            loading: false,
        })));
    }
}
exports.createGenericReducer = createGenericReducer;
function createGenericReducerState(entityName, actions, entityAdapter) {
    {
        return (0, store_1.createReducer)(entityAdapter.getInitialState(), (0, store_1.on)(actions.load, (state) => ({
            ...state,
            loaded: false,
            error: null,
        })), (0, store_1.on)(actions.loadSuccess, (state, { payload: entities }) => {
            return entityAdapter.setAll(entities, state);
        }), (0, store_1.on)(actions.loadFail, (state, { error }) => ({
            ...state,
            loaded: false,
            loading: false,
            error: error,
        })), 
        // Filtered
        (0, store_1.on)(actions.loadEntitiesFiltered, (state) => ({
            ...state,
            loaded: false,
            loading: true,
            error: null,
        })), (0, store_1.on)(actions.loadEntitiesFilteredSuccess, (state, { payload: paginated }) => {
            return entityAdapter.setAll(paginated.data, {
                ...state,
                loaded: true,
                pagination_meta: paginated.meta,
                loading: false,
            });
        }), (0, store_1.on)(actions.loadEntitiesFilteredFail, (state, { error }) => entityAdapter.removeAll({
            ...state,
            error,
            loaded: true,
            loading: false,
        })), 
        // Select
        (0, store_1.on)(actions.selectEntity, (state, { payload }) => {
            return {
                ...state,
                selectedEntityId: payload.entityId,
                loaded: false,
                loading: true,
            };
        }), (0, store_1.on)(actions.selectEntitySuccess, (state, { payload }) => {
            return entityAdapter.setOne(payload.entity, {
                ...state,
                loaded: true,
                loading: false,
            });
        }), 
        // Add
        (0, store_1.on)(actions.addEntity, (state) => ({
            ...state,
            loaded: false,
            loading: true,
            error: null,
        })), (0, store_1.on)(actions.addEntitySuccess, (state, { payload }) => {
            return entityAdapter.addOne(payload.entity, {
                ...state,
                loading: false,
            });
        }), (0, store_1.on)(actions.addEntityFail, (state, { error }) => ({
            ...state,
            loading: false,
        })), 
        // Edit
        (0, store_1.on)(actions.editEntity, (state, { payload: { entity } }) => {
            return entityAdapter.updateOne({
                id: entity.id,
                changes: entity.changes,
            }, {
                ...state,
                loading: true,
            });
        }), (0, store_1.on)(actions.editEntitySuccess, (state) => ({
            ...state,
            loading: false,
        })), (0, store_1.on)(actions.editEntityFail, (state, { error }) => ({
            ...state,
            loading: false,
        })), 
        // Delete
        (0, store_1.on)(actions.deleteEntity, (state) => ({
            ...state,
            loading: true,
        })), (0, store_1.on)(actions.deleteEntitySuccess, (state, { payload }) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return entityAdapter.removeOne(payload.entity.id, {
                ...state,
                loading: false,
            });
        }), (0, store_1.on)(actions.deleteEntityFail, (state, { error }) => ({
            ...state,
            loading: false,
        })), 
        // Export
        (0, store_1.on)(actions.exportEntities, (state) => ({
            ...state,
            loading: true,
        })), (0, store_1.on)(actions.exportEntitiesSuccess, (state) => ({
            ...state,
            loading: false,
        })), (0, store_1.on)(actions.exportEntitiesFail, (state) => ({
            ...state,
            loading: false,
        })));
    }
}
exports.createGenericReducerState = createGenericReducerState;
//# sourceMappingURL=generic.reducers.js.map