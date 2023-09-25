"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META = exports.decorator_models = void 0;
require("reflect-metadata");
const model_class_decorator_1 = require("../decoraters/model-class.decorator");
exports.decorator_models = [];
const MODELCLASS_PREFIX = 'fb:models';
class META {
    static getModelByName(name) {
        for (const model of exports.decorator_models) {
            if (Reflect.getMetadata(MODELCLASS_PREFIX, model) === name) {
                if (model) {
                    return new model();
                }
                else {
                    // Handle the case where no model was found.
                    console.log('No model found with the given name.');
                }
            }
        }
        // if no model found, return undefined
        return undefined;
    }
    static getNameByModel(constructor) {
        return Reflect.getMetadata(MODELCLASS_PREFIX, constructor.constructor);
    }
    static getOptionsByModel(constructor) {
        return Reflect.getMetadata(model_class_decorator_1.MODELCLASS_OPTIONS_PREFIX, constructor.constructor);
    }
    static getPrefixByModel(constructor) {
        return Reflect.getMetadata(MODELCLASS_PREFIX, constructor.constructor);
    }
}
exports.META = META;
//# sourceMappingURL=meta-data.helper.js.map