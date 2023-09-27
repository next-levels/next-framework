import 'reflect-metadata';
export declare const TRANSLATE_FIELD_METADATA_KEY = "translatable_metadata";
export declare const TRANSLATABLE_FIELDS_METADATA_KEY: unique symbol;
export declare function TranslatableFields(fields: string[]): ClassDecorator;
