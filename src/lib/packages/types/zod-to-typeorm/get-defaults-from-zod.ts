import {AnyZodObject, ZodDefault, ZodObject, ZodTypeAny} from 'zod';
import {isZodInstance} from './is-zod-instance';

/**
 * Recursively generates default values from a Zod object schema.
 *
 * This function explores each field of a Zod object schema and accumulates
 * the default values defined within.
 *
 * @param {AnyZodObject} schema The Zod object schema.
 * @return {Record<string, any>} A record where keys are schema field names and values are their default values.
 */
export function extractDefaultsFromObject(
  schema: AnyZodObject
): Record<string, any> {
  const fields = schema.shape;
  return Object.keys(fields).reduce((defaults, fieldName) => {
    const fieldSchema = fields[fieldName];
    const defaultValue = generateDefaults(fieldSchema);
    if (defaultValue !== undefined) {
      // Ensures only fields with defaults are added
      defaults[fieldName] = defaultValue;
    }
    return defaults;
  }, {} as Record<string, any>);
}

/**
 * Extracts the default value from a Zod schema.
 * This function handles both basic schemas and nested object schemas.
 *
 * @template T Type parameter extended from ZodTypeAny for flexibility.
 * @param {T} schema The Zod schema to extract the default from.
 * @return {any} The default value if defined, or undefined if not.
 */
export function generateDefaults<T extends ZodTypeAny>(schema: T): any {
  if (isZodInstance(ZodObject, schema)) {
    return extractDefaultsFromObject(schema as AnyZodObject);
  } else if (isZodInstance(ZodDefault, schema)) {
    return schema._def.defaultValue();
  }
  // Returns undefined if no default is specified in the schema
}
