import 'reflect-metadata';
import { BuilderOptions } from '../types/options/base-options';

export const BUILDERFIELD_PREFIX = 'bf:fields';
export const BUILDERFIELD_ALL_PREFIX = 'bf:fields:all';

export function Field(o: BuilderOptions) {
  return (target: object, propertyKey: string) => {
    const variables =
      Reflect.getMetadata(BUILDERFIELD_ALL_PREFIX, target) || [];
    variables.push(propertyKey);
    Reflect.defineMetadata(BUILDERFIELD_ALL_PREFIX, variables, target);
    if (o !== undefined && o !== null) {
      Reflect.defineMetadata(BUILDERFIELD_PREFIX, o, target, propertyKey);
    }
  };
}
