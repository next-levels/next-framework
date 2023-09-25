"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotificationActions = void 0;
const store_1 = require("@ngrx/store");
function createNotificationActions(entityName) {
    return {
        setEntity: (0, store_1.createAction)(`[${entityName} Page] Set Entity`, (0, store_1.props)()),
        setEntitySuccess: (0, store_1.createAction)(`[${entityName} API] Set Entity Success`, (0, store_1.props)()),
        setEntityFail: (0, store_1.createAction)(`[${entityName} API] Set Entity Fail`, (0, store_1.props)()),
        setCount: (0, store_1.createAction)(`[${entityName} API] Set Count Entity Fail`, (0, store_1.props)()),
        resetCount: (0, store_1.createAction)(`[${entityName} API] Reset Count Entity Fail`, (0, store_1.props)()),
    };
}
exports.createNotificationActions = createNotificationActions;
//# sourceMappingURL=notification.actions.js.map