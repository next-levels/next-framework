"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationFacade = void 0;
var base_facede_1 = require("../../factory/base.facede");
var NotificationFacade = /** @class */ (function (_super) {
    __extends(NotificationFacade, _super);
    function NotificationFacade(store, baseActions, baseSelectors) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.baseActions = baseActions;
        _this.baseSelectors = baseSelectors;
        if (_this.baseSelectors) {
            _this.unReadCount$ = _this.store.select(_this.baseSelectors.getEntityNotificationCount);
            _this.updated$ = _this.store.select(_this.baseSelectors.getEntityNotificationUpdated);
        }
        return _this;
    }
    NotificationFacade.prototype.setEntity = function (entity) {
        this.store.dispatch(this.baseActions.setEntity({ payload: entity }));
    };
    NotificationFacade.prototype.resetCount = function (entity) {
        this.store.dispatch(this.baseActions.resetCount({ payload: entity }));
    };
    return NotificationFacade;
}(base_facede_1.StoreFacade));
exports.NotificationFacade = NotificationFacade;
