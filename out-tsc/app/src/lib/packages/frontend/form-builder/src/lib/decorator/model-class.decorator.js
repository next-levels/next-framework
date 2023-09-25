"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelByName = exports.Model = exports.MODELCLASS_ALL_PREFIX = exports.MODELCLASS_PREFIX = void 0;
require("reflect-metadata");
const src_1 = require("../../../../../shared/generics/src");
exports.MODELCLASS_PREFIX = 'fb:models';
exports.MODELCLASS_ALL_PREFIX = 'fb:models:all';
function Model(name) {
    return (constructor) => {
        const variables = Reflect.getMetadata(exports.MODELCLASS_ALL_PREFIX, constructor) || [];
        variables.push(name);
        Reflect.defineMetadata(exports.MODELCLASS_ALL_PREFIX, variables, constructor);
        Reflect.defineMetadata(exports.MODELCLASS_PREFIX, name, constructor);
        src_1.decorator_models.push(constructor); // push the constructor to the array
    };
}
exports.Model = Model;
function getModelByName(name) {
    // search through the models for one with a matching name
    for (const model of src_1.decorator_models) {
        if (Reflect.getMetadata(exports.MODELCLASS_PREFIX, model) === name) {
            return model;
        }
    }
    // if no model found, return undefined
    return undefined;
}
exports.getModelByName = getModelByName;
//# sourceMappingURL=model-class.decorator.js.map