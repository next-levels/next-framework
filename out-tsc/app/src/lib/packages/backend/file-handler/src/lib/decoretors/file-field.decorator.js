"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileField = exports.FILE_FIELD_METADATA_KEY = void 0;
require("reflect-metadata");
exports.FILE_FIELD_METADATA_KEY = 'file_field_metadata';
function FileField(options) {
    return (target, propertyKey) => {
        const fileFields = Reflect.getMetadata(exports.FILE_FIELD_METADATA_KEY, target) || [];
        const fieldData = {
            fieldName: propertyKey,
            multi: options?.multi || false,
        };
        fileFields.push(fieldData);
        Reflect.defineMetadata(exports.FILE_FIELD_METADATA_KEY, fileFields, target);
    };
}
exports.FileField = FileField;
//# sourceMappingURL=file-field.decorator.js.map