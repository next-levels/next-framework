"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
require("reflect-metadata");
const src_1 = require("../../../../../shared/generics/src");
class BaseController {
    constructor(model, facade, modelDefinition = null) {
        this.modelDefinition = null;
        this.facade = facade;
        this.model = model;
        this.modelDefinition = modelDefinition;
        this.modelClassName = src_1.META.getNameByModel(this.modelDefinition);
        console.log(this.facade);
    }
    getClassName() {
        return src_1.META.getNameByModel(this.getModelDefinition());
    }
    getModel() {
        return this.model;
    }
    getModelClassName() {
        return this.modelClassName;
    }
    getModelName() {
        return this.model;
    }
    getModelOptions(model) {
        if (model) {
            return src_1.META.getOptionsByModel(model);
        }
        return src_1.META.getOptionsByModel(this.modelDefinition);
    }
    getFacade() {
        return this.facade;
    }
    getValue(name) {
        return this.model[name] || null;
    }
    getModelDefinition() {
        return this.modelDefinition;
    }
    getElementLabel(fieldName) {
        return this.getModelClassName() + '.properties.' + fieldName;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=BaseController.js.map