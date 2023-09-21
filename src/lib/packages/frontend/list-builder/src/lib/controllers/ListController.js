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
exports.ListController = void 0;
require("reflect-metadata");
var BaseController_1 = require("./BaseController");
var src_1 = require("../../../../generic-store/src");
var ListController = /** @class */ (function (_super) {
    __extends(ListController, _super);
    function ListController(model, facade, modelDefinition) {
        var _this = this;
        if (!modelDefinition) {
            modelDefinition = Reflect.getMetadata('modelDefinition', model);
        }
        if (facade === undefined) {
            var myFacade = src_1.FacadeRegistry.getFacade(model.constructor.name);
            if (myFacade) {
                facade = myFacade;
            }
            else {
                throw new Error('No facade found for model ' + model.constructor.name);
            }
        }
        _this = _super.call(this, model, facade, modelDefinition) || this;
        _this.scope = [];
        return _this;
    }
    ListController.prototype.setScope = function (key, operation, value) {
        this.scope.push({ key: key, operation: operation, value: value });
    };
    ListController.prototype.getScope = function () {
        return this.scope;
    };
    return ListController;
}(BaseController_1.BaseController));
exports.ListController = ListController;
