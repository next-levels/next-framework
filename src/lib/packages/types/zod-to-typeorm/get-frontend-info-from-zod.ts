import {
  ZodArray,
  ZodBoolean,
  ZodDate,
  ZodEnum,
  ZodNativeEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodReadonly,
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

    if (isZodInstance(ZodReadonly, zodType)) {
      options = {
        ...options,
        readonly: true,
      };
    }

    return zodToFields(unwrapType(zodType), options);
  }

  if (isZodInstance(ZodString, zodType)) {
    if (zodType._def && zodType._def.checks) {
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
        ...options,
        type: 'TEXT',
        ...(maxLength && maxLength <= 255 ? { max: maxLength } : {}),
      };
    } else {
      options = {
        ...options,
        type: 'TEXT',
      };
    }
  } else if (isZodInstance(ZodNumber, zodType)) {
    const isInteger = Boolean(
      zodType._def.checks.find((check: any) => check.kind === 'int')
    );
    options = {
      ...options,
      type: 'NUMBER',
    };
  } else if (isZodInstance(ZodDate, zodType)) {
    options = {
      ...options,
      type: 'DATE',
    };
  } else if (isZodInstance(ZodBoolean, zodType)) {
    options = {
      ...options,
      type: 'CHECKBOX',
    };
  } else if (
    isZodInstance(ZodEnum, zodType) ||
    isZodInstance(ZodNativeEnum, zodType)
  ) {
    options = {
      ...options,
      type: 'DROPDOWN',
      options: { options: zodType._def.values as any[] },
    };
  } else if (isZodInstance(ZodArray, zodType)) {
    // Arrays may require specific handling based on your database and TypeORM driver
    const elementType = zodToFields(zodType.element);
    options = {
      ...options,
      type: 'JSON',
    };
  } else if (isZodInstance(ZodObject, zodType)) {
    throw new Error(
      'TypeORM does not support embedded objects directly as columns. Consider relationships or jsonb.'
    );
  } else {
  }

  if (zodType._def && zodType._def.checks) {
    const minLengthCheck = zodType._def.checks.find(
      (check) => check.kind === 'min'
    );

    let minLength: number | string =
      minLengthCheck && 'value' in minLengthCheck
        ? minLengthCheck.value
        : undefined;

    if (typeof minLength === 'string') {
      minLength = parseInt(minLength);
    }

    if (minLength && minLength > 0) {
      options = {
        ...options,
        required: true,
      };
    }
  }

  if (zodType.isOptional()) {
    options.required = false;
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
