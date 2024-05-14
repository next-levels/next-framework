import {ColumnOptions} from 'typeorm';
import {
  ZodArray,
  ZodBoolean,
  ZodDefault,
  ZodEnum,
  ZodNativeEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from 'zod';

import {isZodInstance} from './is-zod-instance';

/**
 * Converts a Zod type to a TypeORM ColumnOptions.
 *
 * @param {ZodTypeAny} zodType The Zod type to convert.
 * @return {ColumnOptions} The corresponding TypeORM ColumnOptions.
 */
export function zodToTypeOrmColumn(zodType: ZodTypeAny): ColumnOptions {
  let options: ColumnOptions = {};

  if (isZodInstance(ZodString, zodType)) {
    // Check for 'max' kind check and correctly handle extraction of 'value' when available
    const maxLengthCheck = zodType._def.checks.find(
      (check) => check.kind === 'max'
    );
    let maxLength: number | string =
      maxLengthCheck && 'value' in maxLengthCheck
        ? maxLengthCheck.value
        : undefined;

    if (typeof maxLength === 'string') {
      maxLength = parseInt(maxLength);
    }

    options = {
      type: maxLength && maxLength <= 255 ? 'varchar' : 'text',
      nullable: zodType.isNullable(),
      ...(maxLength && maxLength <= 255 ? { length: maxLength } : {}),
    };
  } else if (isZodInstance(ZodNumber, zodType)) {
    const isInteger = Boolean(
      zodType._def.checks.find((check: any) => check.kind === 'int')
    );
    options = {
      type: isInteger ? 'int' : 'float',
      nullable: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodBoolean, zodType)) {
    options = {
      type: 'boolean',
      nullable: zodType.isNullable(),
    };
  } else if (
    isZodInstance(ZodEnum, zodType) ||
    isZodInstance(ZodNativeEnum, zodType)
  ) {
    options = {
      type: 'enum',
      enum: zodType._def.values as any[],
      nullable: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodArray, zodType)) {
    // Arrays may require specific handling based on your database and TypeORM driver
    const elementType = zodToTypeOrmColumn(zodType.element);
    options = {
      type: 'simple-array', // Or jsonb, depending on your needs
      nullable: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodNullable, zodType)) {
    // If the type is nullable, we need to unwrap the inner type
    options = zodToTypeOrmColumn(zodType._def.innerType);
  } else if (isZodInstance(ZodObject, zodType)) {
    throw new Error(
      'TypeORM does not support embedded objects directly as columns. Consider relationships or jsonb.'
    );
  } else {
    /*
    throw new Error(
      `Unsupported Zod type for TypeORM column conversion.${zodType._def.kind}`
    );
     */
  }

  if (isZodInstance(ZodDefault, zodType)) {
    options.default = zodType._def.defaultValue();
  }

  if (zodType.isNullable()) {
    options.nullable = true;
  }

  return options;
}
