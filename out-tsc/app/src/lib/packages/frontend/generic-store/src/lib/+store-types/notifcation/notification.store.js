"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStore = void 0;
const entity_1 = require("@ngrx/entity");
const notification_actions_1 = require("./notification.actions");
const notification_reducers_1 = require("./notification.reducers");
const notification_selectors_1 = require("./notification.selectors");
class NotificationStore {
    constructor(entityName) {
        this.entityName = entityName;
        this.adapter = (0, entity_1.createEntityAdapter)();
        this.featureKey = entityName;
        this.baseActions = (0, notification_actions_1.createNotificationActions)(entityName);
        this.baseSelectors = (0, notification_selectors_1.createNotificationSelectors)(entityName, this.adapter);
    }
    get baseReducer() {
        return (0, notification_reducers_1.createNotificationReducer)(this.entityName, this.baseActions, this.adapter);
    }
}
exports.NotificationStore = NotificationStore;
//# sourceMappingURL=notification.store.js.map