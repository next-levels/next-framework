"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormField = exports.FORMFIELD_ALL_PREFIX = exports.FORMFIELD_PREFIX = void 0;
require("reflect-metadata");
exports.FORMFIELD_PREFIX = 'fb:fields';
exports.FORMFIELD_ALL_PREFIX = 'fb:fields:all';
function FormField(o) {
    return (target, propertyKey) => {
        const variables = Reflect.getMetadata(exports.FORMFIELD_ALL_PREFIX, target) || [];
        variables.push(propertyKey);
        Reflect.defineMetadata(exports.FORMFIELD_ALL_PREFIX, variables, target);
        if (o !== undefined && o !== null) {
            Reflect.defineMetadata(exports.FORMFIELD_PREFIX, o, target, propertyKey);
        }
    };
}
exports.FormField = FormField;
//# sourceMappingURL=form-field.decorator.js.map