"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGenericActions = void 0;
const store_1 = require("@ngrx/store");
function createGenericActions(entityName) {
    return {
        load: (0, store_1.createAction)(`[${entityName} Page] Load`),
        loadSuccess: (0, store_1.createAction)(`[${entityName} API] Load Success`, (0, store_1.props)()),
        loadFail: (0, store_1.createAction)(`[${entityName} API] Load Fail`, (0, store_1.props)()),
        loadEntitiesFiltered: (0, store_1.createAction)(`[${entityName} Page] Load Entities Filtered`, (0, store_1.props)()),
        loadEntitiesFilteredSuccess: (0, store_1.createAction)(`[${entityName} API] Load Entities Filtered Success`, (0, store_1.props)()),
        loadEntitiesFilteredFail: (0, store_1.createAction)(`[${entityName} API] Load Entities Filtered Fail`, (0, store_1.props)()),
        selectEntity: (0, store_1.createAction)(`[${entityName} Page] Select Entity`, (0, store_1.props)()),
        selectEntitySuccess: (0, store_1.createAction)(`[${entityName} API] Select Entity Success`, (0, store_1.props)()),
        selectEntityFail: (0, store_1.createAction)(`[${entityName} API] Select Entity Fail`, (0, store_1.props)()),
        addEntity: (0, store_1.createAction)(`[${entityName} Page] Add Entity`, (0, store_1.props)()),
        addEntitySuccess: (0, store_1.createAction)(`[${entityName} API] Add Entity Success`, (0, store_1.props)()),
        addEntityFail: (0, store_1.createAction)(`[${entityName} API] Add Entity Fail`, (0, store_1.props)()),
        editEntity: (0, store_1.createAction)(`[${entityName} Page] Edit Entity`, (0, store_1.props)()),
        editEntitySuccess: (0, store_1.createAction)(`[${entityName} Page] Edit Entity Success`, (0, store_1.props)()),
        editEntityFail: (0, store_1.createAction)(`[${entityName} Page] Edit Entity Fail`, (0, store_1.props)()),
        deleteEntity: (0, store_1.createAction)(`[${entityName} Page] Delete Entity`, (0, store_1.props)()),
        deleteEntitySuccess: (0, store_1.createAction)(`[${entityName} API] Delete Entity Success`, (0, store_1.props)()),
        deleteEntityFail: (0, store_1.createAction)(`[${entityName} API] Delete Entity Fail`, (0, store_1.props)()),
        exportEntities: (0, store_1.createAction)(`[${entityName} Page] Export Entities`, (0, store_1.props)()),
        exportEntitiesSuccess: (0, store_1.createAction)(`[${entityName} API] Export Entities Success`, (0, store_1.props)()),
        exportEntitiesFail: (0, store_1.createAction)(`[${entityName} API] Export Entities Failed`, (0, store_1.props)()),
    };
}
exports.createGenericActions = createGenericActions;
//# sourceMappingURL=generic.actions.js.map