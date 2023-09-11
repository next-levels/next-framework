import 'reflect-metadata';
import { FormOptions } from '../types/options/form-options';
export const FORMFIELD_PREFIX = 'fb:fields';
export const FORMFIELD_ALL_PREFIX = 'fb:fields:all';

export function FormField(o: FormOptions) {
  return (target: object, propertyKey: string) => {
    const variables = Reflect.getMetadata(FORMFIELD_ALL_PREFIX, target) || [];
    variables.push(propertyKey);
    Reflect.defineMetadata(FORMFIELD_ALL_PREFIX, variables, target);
    if (o !== undefined && o !== null) {
      Reflect.defineMetadata(FORMFIELD_PREFIX, o, target, propertyKey);
    }
  };
}
