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
exports.BaseFacade = exports.StoreFacade = void 0;
var StoreFacade = /** @class */ (function () {
    function StoreFacade() {
    }
    return StoreFacade;
}());
exports.StoreFacade = StoreFacade;
var BaseFacade = /** @class */ (function (_super) {
    __extends(BaseFacade, _super);
    function BaseFacade(store, baseActions, baseSelectors) {
        var _this = _super.call(this) || this;
        _this.store = store;
        _this.baseActions = baseActions;
        _this.baseSelectors = baseSelectors;
        _this.loaded$ = _this.store.select(_this.baseSelectors.getIsLoading);
        _this.all$ = _this.store.select(_this.baseSelectors.getEntities);
        _this.filtered$ = _this.store.select(_this.baseSelectors.getEntities);
        _this.selected$ = _this.store.select(_this.baseSelectors.getSelectedEntity);
        _this.pagination$ = _this.store.select(_this.baseSelectors.getPagination);
        return _this;
    }
    BaseFacade.prototype.loadAll = function () {
        this.store.dispatch(this.baseActions.load());
    };
    BaseFacade.prototype.loadFiltered = function (filterOptions) {
        this.store.dispatch(this.baseActions.loadEntitiesFiltered({ payload: filterOptions }));
    };
    BaseFacade.prototype.select = function (entityId) {
        this.store.dispatch(this.baseActions.selectEntity({ payload: { entityId: entityId } }));
    };
    BaseFacade.prototype.update = function (entity) {
        this.store.dispatch(this.baseActions.editEntity({ payload: { entity: entity } }));
    };
    BaseFacade.prototype.add = function (entity) {
        this.store.dispatch(this.baseActions.addEntity({ payload: { entity: entity } }));
    };
    BaseFacade.prototype.delete = function (entity) {
        this.store.dispatch(this.baseActions.deleteEntity({ payload: { entity: entity } }));
    };
    return BaseFacade;
}(StoreFacade));
exports.BaseFacade = BaseFacade;
