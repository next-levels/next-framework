"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModelByName = exports.Model = exports.MODELCLASS_ALL_PREFIX = exports.MODELCLASS_OPTIONS_PREFIX = exports.MODELCLASS_PREFIX = void 0;
require("reflect-metadata");
var meta_data_helper_1 = require("../helpers/meta-data.helper");
exports.MODELCLASS_PREFIX = 'fb:models';
exports.MODELCLASS_OPTIONS_PREFIX = 'fb:models:options';
exports.MODELCLASS_ALL_PREFIX = 'fb:models:all';
function Model(config) {
    var options = null;
    var name = '';
    if (typeof config === 'string') {
        name = config;
        options = { name: name, label: '', features: [], url: '' };
    }
    if (typeof config === 'object') {
        name = config.name;
        options = config;
    }
    return function (constructor) {
        var variables = Reflect.getMetadata(exports.MODELCLASS_ALL_PREFIX, constructor) || [];
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
    for (var _i = 0, decorator_models_1 = meta_data_helper_1.decorator_models; _i < decorator_models_1.length; _i++) {
        var model = decorator_models_1[_i];
        if (Reflect.getMetadata(exports.MODELCLASS_PREFIX, model) === name) {
            return model;
        }
    }
    // if no model found, return undefined
    return undefined;
}
exports.getModelByName = getModelByName;
