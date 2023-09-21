"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relation = exports.RELATION_ALL_PREFIX = void 0;
require("reflect-metadata");
exports.RELATION_ALL_PREFIX = 'lc:relation:all';
function Relation() {
    return function (target, propertyKey) {
        var fileFields = Reflect.getMetadata(exports.RELATION_ALL_PREFIX, target) || [];
        fileFields.push(propertyKey);
        Reflect.defineMetadata(exports.RELATION_ALL_PREFIX, fileFields, target);
    };
}
exports.Relation = Relation;
