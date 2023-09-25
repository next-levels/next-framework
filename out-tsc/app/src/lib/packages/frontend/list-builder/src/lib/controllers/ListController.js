"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListController = void 0;
require("reflect-metadata");
const BaseController_1 = require("./BaseController");
const src_1 = require("../../../../generic-store/src");
class ListController extends BaseController_1.BaseController {
    constructor(model, facade, modelDefinition) {
        if (!modelDefinition) {
            modelDefinition = Reflect.getMetadata('modelDefinition', model);
        }
        if (facade === undefined) {
            const myFacade = src_1.FacadeRegistry.getFacade(model.constructor.name);
            if (myFacade) {
                facade = myFacade;
            }
            else {
                throw new Error('No facade found for model ' + model.constructor.name);
            }
        }
        super(model, facade, modelDefinition);
        this.scope = [];
    }
    setScope(key, operation, value) {
        this.scope.push({ key: key, operation: operation, value: value });
    }
    getScope() {
        return this.scope;
    }
}
exports.ListController = ListController;
//# sourceMappingURL=ListController.js.map