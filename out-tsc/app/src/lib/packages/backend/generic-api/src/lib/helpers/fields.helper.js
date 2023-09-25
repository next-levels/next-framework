"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRelationFields = exports.getFilterFields = void 0;
require("reflect-metadata");
const relation_decorator_1 = require("../decorator/relation.decorator");
const field_decorator_1 = require("src/lib/packages/shared/generics/src/lib/decoraters/field.decorator");
function getFilterFields(entity) {
    const fileFields = Reflect.getMetadata(field_decorator_1.BUILDERFIELD_ALL_PREFIX, entity.prototype);
    return fileFields;
}
exports.getFilterFields = getFilterFields;
function getRelationFields(entity) {
    const fileFields = Reflect.getMetadata(relation_decorator_1.RELATION_ALL_PREFIX, entity?.prototype);
    return fileFields;
}
exports.getRelationFields = getRelationFields;
//# sourceMappingURL=fields.helper.js.map