import 'reflect-metadata';
import { translatableEntities } from '../translatable-entities';
export const TRANSLATE_FIELD_METADATA_KEY = 'translatable_metadata';
export const TRANSLATABLE_FIELDS_METADATA_KEY = Symbol('translatableFields');
export function TranslatableFields(fields: string[]): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(TRANSLATABLE_FIELDS_METADATA_KEY, fields, target);
    translatableEntities.push(target);
  };
}
