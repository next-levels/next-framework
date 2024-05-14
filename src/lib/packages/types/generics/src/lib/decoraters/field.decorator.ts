import 'reflect-metadata';
import { BuilderOptions } from '../types/options/base-options';
import { FormControl } from '../types/view-options/base-options';

export const BUILDERFIELD_PREFIX = 'bf:fields';
export const BUILDERFIELD_ALL_PREFIX = 'bf:fields:all';

export function Field(o: BuilderOptions | FormControl) {
  if ('getSettings' in o) {
    o = o.getSettings();
  }

  return (target: object, propertyKey: string) => {
    const variables =
      Reflect.getMetadata(BUILDERFIELD_ALL_PREFIX, target) || [];

    if (!variables.includes(propertyKey)) {
      variables.push(propertyKey);
    }

    Reflect.defineMetadata(BUILDERFIELD_ALL_PREFIX, variables, target);

    Reflect.defineMetadata(
      'design:type',
      Reflect.getMetadata('design:type', target, propertyKey),
      target,
      propertyKey
    );

    if (o !== undefined && o !== null) {
      const existingOptions =
        Reflect.getMetadata(BUILDERFIELD_PREFIX, target, propertyKey) || {};
      const mergedOptions = { ...existingOptions, ...o };
      Reflect.defineMetadata(
        BUILDERFIELD_PREFIX,
        mergedOptions,
        target,
        propertyKey
      );
    }
  };
}
