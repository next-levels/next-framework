import 'reflect-metadata';
import { z } from 'zod';
import {
  SYSTEM_SCHEMA_METADATA_KEY,
  ZOD_SCHEMA_METADATA_KEY,
} from '@next-levels/types';
import { FormGroup } from '@angular/forms';

export function constructZodSchemaFromClass(
  targetClass: Function,
  form: FormGroup
): z.ZodTypeAny {
  const schemaObject: { [key: string]: z.ZodTypeAny } = {};
  const keys = Object.getOwnPropertyNames(targetClass.prototype);

  let systemFields =
    Reflect.getMetadata(SYSTEM_SCHEMA_METADATA_KEY, targetClass.prototype) ||
    [];

  keys.forEach((propertyKey) => {
    if (
      propertyKey !== 'constructor' &&
      form.controls[propertyKey] &&
      !systemFields.includes(propertyKey)
    ) {
      const schema = Reflect.getMetadata(
        ZOD_SCHEMA_METADATA_KEY,
        targetClass.prototype,
        propertyKey
      );
      if (schema) {
        schemaObject[propertyKey] = schema;
      }
    }
  });

  return z.object(schemaObject);
}

export function constructZodSchemaFromClassField(
  targetClass: Function,
  field: string
): z.ZodTypeAny {
  const schema = Reflect.getMetadata(
    ZOD_SCHEMA_METADATA_KEY,
    targetClass.prototype,
    field
  );

  return schema;
}
