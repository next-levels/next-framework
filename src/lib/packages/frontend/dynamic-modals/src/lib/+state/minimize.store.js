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
exports.MinimizeStore = void 0;
var src_1 = require("../../../../generic-store/src");
var MinimizeStore = /** @class */ (function (_super) {
    __extends(MinimizeStore, _super);
    function MinimizeStore() {
        var _this = _super.call(this, 'minimized') || this;
        _this.baseReducers = (0, src_1.createGenericReducer)(_this.entityName, _this.baseActions, _this.adapter);
        return _this;
    }
    MinimizeStore.getReducers = function () {
        return new MinimizeStore().baseReducers;
    };
    MinimizeStore.getActions = function () {
        return new MinimizeStore().baseActions;
    };
    MinimizeStore.getSelectors = function () {
        return new MinimizeStore().baseSelectors;
    };
    return MinimizeStore;
}(src_1.BaseStore));
exports.MinimizeStore = MinimizeStore;
