import { ZodTypeAny } from 'zod';
import { PrimaryGeneratedColumn } from 'typeorm';
import { PropertyTagType } from '@next-levels/types';

/**
 * Interprets Zod schema to determine if a column should be a primary key with UUID generation.
 * @param {ZodSchema} schema - The Zod schema to interpret.
 * @return {boolean} - True if the column should be a UUID primary column.
 */
function shouldBePrimaryGeneratedUUID(schema: ZodTypeAny): boolean {
  // Example logic: check for a specific meta attribute or use naming convention
  return schema.description?.includes('uuid-primary');
}

/**
 * Interprets Zod schema to determine if a column should be a primary key.
 * @param {ZodSchema} schema - The Zod schema to interpret.
 * @return {boolean} - True if the column should be a primary key.
 */
function shouldBePrimaryColumn(schema: ZodTypeAny): boolean {
  return schema.description?.includes('primary');
}

/**
 * Dynamically applies TypeORM decorators based on Zod schema descriptions using reflect-metadata.
 * @param target - The class the decorator is applied to.
 * @param propertyKey - The name of the property to decorate.
 * @param schema - The Zod schema associated with the property.
 * @param flags
 */
export function applyFieldDecoratorsFromZodFlags(
  target: any,
  propertyKey: string,
  schema: ZodTypeAny,
  flags?: PropertyTagType[] | PropertyTagType
) {
  if (!Array.isArray(flags)) {
    flags = [flags];
  }
  if (flags?.includes('uuid')) {
    Reflect.defineMetadata(
      'custom:primaryGeneratedColumn',
      'uuid',
      target,
      propertyKey
    );
  } else if (flags?.includes('primary')) {
    PrimaryGeneratedColumn()(target, propertyKey);
    return true;
  }

  if (schema.description?.includes('created')) {
    Reflect.defineMetadata(
      'custom:createDateColumn',
      true,
      target,
      propertyKey
    );
  }

  if (schema.description?.includes('updated')) {
    Reflect.defineMetadata(
      'custom:updateDateColumn',
      true,
      target,
      propertyKey
    );
  }

  if (schema.description?.includes('deleted')) {
    Reflect.defineMetadata(
      'custom:deleteDateColumn',
      true,
      target,
      propertyKey
    );
  }
  return false;
}
