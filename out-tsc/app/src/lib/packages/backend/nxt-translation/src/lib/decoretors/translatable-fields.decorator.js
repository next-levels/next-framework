"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslatableFields = exports.TRANSLATABLE_FIELDS_METADATA_KEY = exports.TRANSLATE_FIELD_METADATA_KEY = void 0;
require("reflect-metadata");
const translatable_entities_1 = require("../translatable-entities");
exports.TRANSLATE_FIELD_METADATA_KEY = 'translatable_metadata';
exports.TRANSLATABLE_FIELDS_METADATA_KEY = Symbol('translatableFields');
function TranslatableFields(fields) {
    return (target) => {
        Reflect.defineMetadata(exports.TRANSLATABLE_FIELDS_METADATA_KEY, fields, target);
        translatable_entities_1.translatableEntities.push(target);
    };
}
exports.TranslatableFields = TranslatableFields;
//# sourceMappingURL=translatable-fields.decorator.js.map