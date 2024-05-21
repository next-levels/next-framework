import 'reflect-metadata';
import { z } from 'zod';
import { zodToTypeOrmColumn } from '../../../../zod-to-typeorm/get-field-info-from-zod';
import { Column } from 'typeorm';
import { PropertyTagType } from '../types/options/property-tag';
import { applyTypeOrmDecoratorsFromZodFlags } from '../../../../zod-to-typeorm/schema-interpreter-from-flags';
import { zodToFields } from '../../../../zod-to-typeorm/get-frontend-info-from-zod';
import { Field } from './field.decorator';

export const ZOD_SCHEMA_METADATA_KEY = Symbol('ZodSchema');
export const SYSTEM_SCHEMA_METADATA_KEY = Symbol('SystemSchema');

export function Property(
  schema: z.ZodType<any> | any,
  flags?: PropertyTagType[] | PropertyTagType
) {
  return (target: object, propertyKey: string) => {
    const metadata = schema._def;

    if (!target.hasOwnProperty(propertyKey)) {
      Object.defineProperty(target, propertyKey, {
        value: null,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    if (!Array.isArray(flags)) {
      flags = [flags];
    }

    Reflect.defineMetadata(
      ZOD_SCHEMA_METADATA_KEY,
      schema,
      target,
      propertyKey
    );

    if (!flags?.includes('virtual')) {
      let needColumn = !applyTypeOrmDecoratorsFromZodFlags(
        target,
        propertyKey,
        schema,
        flags
      );

      if (needColumn) {
        let columnOptions = zodToTypeOrmColumn(schema);
        Column(columnOptions)(target, propertyKey);
        Reflect.defineMetadata(
          'design:typeorm:options',
          columnOptions,
          target,
          propertyKey
        );
      }
    }

    let fieldOptions = zodToFields(schema);

    if (flags?.includes('system')) {
      const systemFields =
        Reflect.getMetadata(SYSTEM_SCHEMA_METADATA_KEY, target) || [];

      if (!systemFields.includes(propertyKey)) {
        systemFields.push(propertyKey);
      }

      Reflect.defineMetadata(SYSTEM_SCHEMA_METADATA_KEY, systemFields, target);

      fieldOptions = {
        ...fieldOptions,
        hidden: true,
      };
    }

    Field(fieldOptions)(target, propertyKey);
  };
}
