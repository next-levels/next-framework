import 'reflect-metadata';
import { DependencyOptions } from '../types/dependency-options';

export const DEPENDENCY_PREFIX = 'fb:dependency';

export function Dependency(d: DependencyOptions) {
  return (target: object, propertyKey: string) => {
    if (d !== undefined && d !== null) {
      Reflect.defineMetadata(DEPENDENCY_PREFIX, d, target, propertyKey);
    }
  };
}
