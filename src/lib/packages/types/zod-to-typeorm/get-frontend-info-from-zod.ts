import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodEnum,
  ZodNativeEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodString,
  ZodTypeAny,
} from 'zod';

import {isZodInstance} from './is-zod-instance';
import {BuilderOptions} from '@next-levels/types';

/**
 * Converts a Zod type to a TypeORM ColumnOptions.
 *
 * @param {ZodTypeAny} zodType The Zod type to convert.
 * @param options
 * @return {BuilderOptions} The corresponding BuilderOptions.
 */
export function zodToFields(
  zodType: ZodTypeAny,
  options: BuilderOptions = { type: 'TEXT' }
): BuilderOptions {
  if (isWrappedType(zodType)) {
    if (isZodInstance(ZodNullable, zodType)) {
      options = {
        ...options,
        required: false,
      };
    }

    return zodToFields(unwrapType(zodType), options);
  }

  if (isZodInstance(ZodString, zodType)) {
    options = {
      type: 'TEXT',
      required: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodNumber, zodType)) {
    const isInteger = Boolean(
      zodType._def.checks.find((check: any) => check.kind === 'int')
    );
    options = {
      type: 'NUMBER',
      required: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodDate, zodType)) {
    options = {
      type: 'DATE',
      required: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodBoolean, zodType)) {
    options = {
      type: 'CHECKBOX',
      required: zodType.isNullable(),
    };
  } else if (
    isZodInstance(ZodEnum, zodType) ||
    isZodInstance(ZodNativeEnum, zodType)
  ) {
    options = {
      type: 'DROPDOWN',
      options: { options: zodType._def.values as any[] },
      required: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodArray, zodType)) {
    // Arrays may require specific handling based on your database and TypeORM driver
    const elementType = zodToFields(zodType.element);
    options = {
      type: 'JSON', // Or jsonb, depending on your needs
      required: zodType.isNullable(),
    };
  } else if (isZodInstance(ZodObject, zodType)) {
    throw new Error(
      'TypeORM does not support embedded objects directly as columns. Consider relationships or jsonb.'
    );
  } else {
    console.log(options, zodType);
  }

  if (zodType.isOptional()) {
    options.required = true;
  }

  return options;
}

function unwrapType(type: ZodTypeAny): ZodTypeAny {
  type = type._def.innerType || type._def.type;

  return type;
}

// Helper function to check if a type is wrapped
function isWrappedType(type: ZodTypeAny): boolean {
  return type._def && (type._def.innerType || type._def.type);
}
