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
exports.createBaseReducers = void 0;
var store_1 = require("@ngrx/store");
function createBaseReducers(entityName, actions, entityAdapter) {
    return (0, store_1.createReducer)(entityAdapter.getInitialState(), (0, store_1.on)(actions.load, function (state) { return (__assign(__assign({}, state), { loaded: false, error: null })); }), (0, store_1.on)(actions.loadSuccess, function (state, _a) {
        var entities = _a.payload;
        return entityAdapter.setAll(entities, state);
    }), (0, store_1.on)(actions.loadFail, function (state, _a) {
        var error = _a.error;
        return (__assign(__assign({}, state), { loaded: false, loading: false, error: error }));
    }), 
    // Filtered
    (0, store_1.on)(actions.loadEntitiesFiltered, function (state) { return (__assign(__assign({}, state), { loaded: false, loading: true, error: null })); }), (0, store_1.on)(actions.loadEntitiesFilteredSuccess, function (state, _a) {
        var paginated = _a.payload;
        return entityAdapter.setAll(paginated.data, __assign(__assign({}, state), { loaded: true, pagination_meta: paginated.meta, loading: false }));
    }), (0, store_1.on)(actions.loadEntitiesFilteredFail, function (state, _a) {
        var error = _a.error;
        return entityAdapter.removeAll(__assign(__assign({}, state), { error: error, loaded: true, loading: false }));
    }), 
    // Select
    (0, store_1.on)(actions.selectEntity, function (state, _a) {
        var payload = _a.payload;
        return __assign(__assign({}, state), { selectedEntityId: payload.entityId, loaded: false, loading: true });
    }), (0, store_1.on)(actions.selectEntitySuccess, function (state, _a) {
        var payload = _a.payload;
        return entityAdapter.setOne(payload.entity, __assign(__assign({}, state), { loaded: true, loading: false }));
    }), 
    // Add
    (0, store_1.on)(actions.addEntity, function (state) { return (__assign(__assign({}, state), { loaded: false, loading: true, error: null })); }), (0, store_1.on)(actions.addEntitySuccess, function (state, _a) {
        var payload = _a.payload;
        return entityAdapter.addOne(payload.entity, __assign(__assign({}, state), { loading: false }));
    }), (0, store_1.on)(actions.addEntityFail, function (state, _a) {
        var error = _a.error;
        return (__assign(__assign({}, state), { loading: false }));
    }), 
    // Edit
    (0, store_1.on)(actions.editEntity, function (state, _a) {
        var entity = _a.payload.entity;
        return entityAdapter.updateOne({
            id: entity.id,
            changes: entity.changes,
        }, __assign(__assign({}, state), { loading: true }));
    }), (0, store_1.on)(actions.editEntitySuccess, function (state) { return (__assign(__assign({}, state), { loading: false })); }), (0, store_1.on)(actions.editEntityFail, function (state, _a) {
        var error = _a.error;
        return (__assign(__assign({}, state), { loading: false }));
    }), 
    // Delete
    (0, store_1.on)(actions.deleteEntity, function (state) { return (__assign(__assign({}, state), { loading: true })); }), (0, store_1.on)(actions.deleteEntitySuccess, function (state, _a) {
        var payload = _a.payload;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return entityAdapter.removeOne(payload.entity.id, __assign(__assign({}, state), { loading: false }));
    }), (0, store_1.on)(actions.deleteEntityFail, function (state, _a) {
        var error = _a.error;
        return (__assign(__assign({}, state), { loading: false }));
    }), 
    // Export
    (0, store_1.on)(actions.exportEntities, function (state) { return (__assign(__assign({}, state), { loading: true })); }), (0, store_1.on)(actions.exportEntitiesSuccess, function (state) { return (__assign(__assign({}, state), { loading: false })); }), (0, store_1.on)(actions.exportEntitiesFail, function (state) { return (__assign(__assign({}, state), { loading: false })); }));
}
exports.createBaseReducers = createBaseReducers;
