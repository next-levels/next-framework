"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filterable = exports.FILTERABLE_ALL_PREFIX = void 0;
require("reflect-metadata");
exports.FILTERABLE_ALL_PREFIX = 'lc:filterable:all';
function Filterable() {
    return function (target, propertyKey) {
        var fileFields = Reflect.getMetadata(exports.FILTERABLE_ALL_PREFIX, target) || [];
        fileFields.push(propertyKey);
        Reflect.defineMetadata(exports.FILTERABLE_ALL_PREFIX, fileFields, target);
    };
}
exports.Filterable = Filterable;
