"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = exports.BUILDERFIELD_ALL_PREFIX = exports.BUILDERFIELD_PREFIX = void 0;
require("reflect-metadata");
exports.BUILDERFIELD_PREFIX = 'bf:fields';
exports.BUILDERFIELD_ALL_PREFIX = 'bf:fields:all';
function Field(o) {
    return (target, propertyKey) => {
        const variables = Reflect.getMetadata(exports.BUILDERFIELD_ALL_PREFIX, target) || [];
        variables.push(propertyKey);
        Reflect.defineMetadata(exports.BUILDERFIELD_ALL_PREFIX, variables, target);
        if (o !== undefined && o !== null) {
            Reflect.defineMetadata(exports.BUILDERFIELD_PREFIX, o, target, propertyKey);
        }
    };
}
exports.Field = Field;
//# sourceMappingURL=field.decorator.js.map