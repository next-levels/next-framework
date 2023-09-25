"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFacade = void 0;
const base_facede_1 = require("../../factory/base.facede");
class NotificationFacade extends base_facede_1.StoreFacade {
    constructor(store, baseActions, baseSelectors) {
        super();
        this.store = store;
        this.baseActions = baseActions;
        this.baseSelectors = baseSelectors;
        if (this.baseSelectors) {
            this.unReadCount$ = this.store.select(this.baseSelectors.getEntityNotificationCount);
            this.updated$ = this.store.select(this.baseSelectors.getEntityNotificationUpdated);
        }
    }
    setEntity(entity) {
        this.store.dispatch(this.baseActions.setEntity({ payload: entity }));
    }
    resetCount(entity) {
        this.store.dispatch(this.baseActions.resetCount({ payload: entity }));
    }
}
exports.NotificationFacade = NotificationFacade;
//# sourceMappingURL=notification.facede.js.map