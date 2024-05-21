import { ZodTypeAny } from 'zod';
import {
  Column,
  CreateDateColumn,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PropertyTagType, uuidTransformer } from '@next-levels/types';

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
export function applyTypeOrmDecoratorsFromZodFlags(
  target: any,
  propertyKey: string,
  schema: ZodTypeAny,
  flags?: PropertyTagType[]
) {
  if (flags?.includes('primary') && flags?.includes('uuid')) {
    PrimaryGeneratedColumn('uuid')(target, propertyKey);
    return true;
  }
  if (flags?.includes('primary') && flags?.includes('increment')) {
    PrimaryGeneratedColumn('increment')(target, propertyKey);
    return true;
  }

  if (flags?.includes('primary') && flags?.includes('binary')) {
    PrimaryColumn({
      type: 'binary',
      length: 16,
      generated: false,
      transformer: uuidTransformer,
    })(target, propertyKey);
    return true;
  } else if (flags?.includes('primary')) {
    PrimaryGeneratedColumn()(target, propertyKey);
    return true;
  }

  if (flags?.includes('binary')) {
    Column({
      type: 'binary',
      length: 16,
      generated: false,
      nullable: true,
      transformer: uuidTransformer,
    })(target, propertyKey);
  }

  if (flags?.includes('created_at')) {
    CreateDateColumn({
      nullable: true,
    })(target, propertyKey);
    return true;
  }

  if (flags?.includes('updated_at')) {
    UpdateDateColumn({
      nullable: true,
    })(target, propertyKey);
    return true;
  }

  if (flags?.includes('index')) {
    Index()(target, propertyKey);
  }
  return false;
}
