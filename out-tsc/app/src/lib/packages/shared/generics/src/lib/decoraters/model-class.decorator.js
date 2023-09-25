"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelByName = exports.Model = exports.MODELCLASS_ALL_PREFIX = exports.MODELCLASS_OPTIONS_PREFIX = exports.MODELCLASS_PREFIX = void 0;
require("reflect-metadata");
const meta_data_helper_1 = require("../helpers/meta-data.helper");
exports.MODELCLASS_PREFIX = 'fb:models';
exports.MODELCLASS_OPTIONS_PREFIX = 'fb:models:options';
exports.MODELCLASS_ALL_PREFIX = 'fb:models:all';
function Model(config) {
    let options = null;
    let name = '';
    if (typeof config === 'string') {
        name = config;
        options = { name, label: '', features: [], url: '' };
    }
    if (typeof config === 'object') {
        name = config.name;
        options = config;
    }
    return (constructor) => {
        const variables = Reflect.getMetadata(exports.MODELCLASS_ALL_PREFIX, constructor) || [];
        variables.push(name);
        Reflect.defineMetadata(exports.MODELCLASS_ALL_PREFIX, variables, constructor);
        Reflect.defineMetadata(exports.MODELCLASS_PREFIX, name, constructor);
        Reflect.defineMetadata(exports.MODELCLASS_OPTIONS_PREFIX, options, constructor);
        meta_data_helper_1.decorator_models.push(constructor); // push the constructor to the array
    };
}
exports.Model = Model;
function getModelByName(name) {
    // search through the models for one with a matching name
    for (const model of meta_data_helper_1.decorator_models) {
        if (Reflect.getMetadata(exports.MODELCLASS_PREFIX, model) === name) {
            return model;
        }
    }
    // if no model found, return undefined
    return undefined;
}
exports.getModelByName = getModelByName;
//# sourceMappingURL=model-class.decorator.js.map