"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListField = exports.LISTFIELD_ALL_PREFIX = exports.LISTFIELD_PREFIX = void 0;
require("reflect-metadata");
exports.LISTFIELD_PREFIX = 'lc:fields';
exports.LISTFIELD_ALL_PREFIX = 'lc:fields:all';
function ListField(o) {
    return function (target, propertyKey) {
        var variables = Reflect.getMetadata(exports.LISTFIELD_ALL_PREFIX, target) || [];
        variables.push(propertyKey);
        Reflect.defineMetadata(exports.LISTFIELD_ALL_PREFIX, variables, target);
        if (o !== undefined && o !== null) {
            Reflect.defineMetadata(exports.LISTFIELD_PREFIX, o, target, propertyKey);
        }
    };
}
exports.ListField = ListField;
