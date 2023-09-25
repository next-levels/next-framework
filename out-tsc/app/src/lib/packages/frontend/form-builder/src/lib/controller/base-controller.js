"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
require("reflect-metadata");
class BaseController {
    constructor(model, store, modelDefinition = null) {
        this.modelDefinition = null;
        this.store = store;
        this.model = model;
        this.modelDefinition = modelDefinition;
    }
    getModel() {
        return this.model;
    }
    getModelClassName() {
        return this.getModelDefinition().className;
    }
    getModelName() {
        return this.model;
    }
    getStore() {
        return this.store;
    }
    getValue(name) {
        return this.model[name] || null;
    }
    getModelDefinition() {
        return this.modelDefinition;
    }
    getElementLabel(fieldName) {
        return 'properties.' + this.getModelClassName() + '.' + fieldName;
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base-controller.js.map