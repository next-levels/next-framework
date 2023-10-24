"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.META = exports.decorator_models = void 0;
require("reflect-metadata");
var model_class_decorator_1 = require("../decoraters/model-class.decorator");
exports.decorator_models = [];
var MODELCLASS_PREFIX = 'fb:models';
var META = /** @class */ (function () {
    function META() {
    }
    META.getModelByName = function (name) {
        for (var _i = 0, decorator_models_1 = exports.decorator_models; _i < decorator_models_1.length; _i++) {
            var model = decorator_models_1[_i];
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
    };
    META.getNameByModel = function (constructor) {
        return Reflect.getMetadata(MODELCLASS_PREFIX, constructor.constructor);
    };
    META.getOptionsByModel = function (constructor) {
        return Reflect.getMetadata(model_class_decorator_1.MODELCLASS_OPTIONS_PREFIX, constructor.constructor);
    };
    META.getPrefixByModel = function (constructor) {
        return Reflect.getMetadata(MODELCLASS_PREFIX, constructor.constructor);
    };
    return META;
}());
exports.META = META;
