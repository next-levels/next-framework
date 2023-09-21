"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
require("reflect-metadata");
var src_1 = require("../../../../../shared/generics/src");
var BaseController = /** @class */ (function () {
    function BaseController(model, facade, modelDefinition) {
        if (modelDefinition === void 0) { modelDefinition = null; }
        this.modelDefinition = null;
        this.facade = facade;
        this.model = model;
        this.modelDefinition = modelDefinition;
        this.modelClassName = src_1.META.getNameByModel(this.modelDefinition);
        console.log(this.facade);
    }
    BaseController.prototype.getClassName = function () {
        return src_1.META.getNameByModel(this.getModelDefinition());
    };
    BaseController.prototype.getModel = function () {
        return this.model;
    };
    BaseController.prototype.getModelClassName = function () {
        return this.modelClassName;
    };
    BaseController.prototype.getModelName = function () {
        return this.model;
    };
    BaseController.prototype.getModelOptions = function (model) {
        if (model) {
            return src_1.META.getOptionsByModel(model);
        }
        return src_1.META.getOptionsByModel(this.modelDefinition);
    };
    BaseController.prototype.getFacade = function () {
        return this.facade;
    };
    BaseController.prototype.getValue = function (name) {
        return this.model[name] || null;
    };
    BaseController.prototype.getModelDefinition = function () {
        return this.modelDefinition;
    };
    BaseController.prototype.getElementLabel = function (fieldName) {
        return this.getModelClassName() + '.properties.' + fieldName;
    };
    return BaseController;
}());
exports.BaseController = BaseController;
