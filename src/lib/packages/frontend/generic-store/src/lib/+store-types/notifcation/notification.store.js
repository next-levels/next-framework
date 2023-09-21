"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStore = void 0;
var entity_1 = require("@ngrx/entity");
var notification_actions_1 = require("./notification.actions");
var notification_reducers_1 = require("./notification.reducers");
var notification_selectors_1 = require("./notification.selectors");
var NotificationStore = /** @class */ (function () {
    function NotificationStore(entityName) {
        this.entityName = entityName;
        this.adapter = (0, entity_1.createEntityAdapter)();
        this.featureKey = entityName;
        this.baseActions = (0, notification_actions_1.createNotificationActions)(entityName);
        this.baseSelectors = (0, notification_selectors_1.createNotificationSelectors)(entityName, this.adapter);
    }
    Object.defineProperty(NotificationStore.prototype, "baseReducer", {
        get: function () {
            return (0, notification_reducers_1.createNotificationReducer)(this.entityName, this.baseActions, this.adapter);
        },
        enumerable: false,
        configurable: true
    });
    return NotificationStore;
}());
exports.NotificationStore = NotificationStore;
