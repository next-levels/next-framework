import 'reflect-metadata';
import { z } from 'zod';
import { ZOD_SCHEMA_METADATA_KEY } from '@next-levels/types';
import { FormGroup } from '@angular/forms';

export function constructZodSchemaFromClass(
  targetClass: Function,
  form: FormGroup
): z.ZodTypeAny {
  const schemaObject: { [key: string]: z.ZodTypeAny } = {};
  const keys = Object.getOwnPropertyNames(targetClass.prototype);

  keys.forEach((propertyKey) => {
    if (propertyKey !== 'constructor' && form.controls[propertyKey]) {
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
