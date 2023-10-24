import 'reflect-metadata';
import { DependencyOptions } from '@next-levels/types';

export const DEPENDENCY_PREFIX = 'fb:dependency';

export function Dependency(d: DependencyOptions) {
  return (target: object, propertyKey: string) => {
    if (d !== undefined && d !== null) {
      Reflect.defineMetadata(DEPENDENCY_PREFIX, d, target, propertyKey);
    }
  };
}
