import 'reflect-metadata';
import { ListOptions } from '../types/options/list-options';
export const LISTFIELD_PREFIX = 'lc:fields';
export const LISTFIELD_ALL_PREFIX = 'lc:fields:all';

export function ListField(o: ListOptions) {
  return (target: object, propertyKey: string) => {
    const variables = Reflect.getMetadata(LISTFIELD_ALL_PREFIX, target) || [];
    variables.push(propertyKey);
    Reflect.defineMetadata(LISTFIELD_ALL_PREFIX, variables, target);

    if (o !== undefined && o !== null) {
      Reflect.defineMetadata(LISTFIELD_PREFIX, o, target, propertyKey);
    }
  };
}
