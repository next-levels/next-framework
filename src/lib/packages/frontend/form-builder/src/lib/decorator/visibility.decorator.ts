import { VisibilityOptions } from '../types/VisibilityOptions';
import 'reflect-metadata';

export const VISIBILITY_PREFIX = 'fb:visibility';
export const VISIBILITY_PREFIX_ALL = 'fb:visibility:all';

export function Visibility(options: VisibilityOptions) {
  return (target: object, key: string) => {
    if (options !== undefined && options !== null) {
      const all = Reflect.getMetadata(VISIBILITY_PREFIX_ALL, target) || [];
      all.push(key);
      Reflect.defineMetadata(VISIBILITY_PREFIX_ALL, all, target);

      return Reflect.defineMetadata(VISIBILITY_PREFIX, options, target, key);
    } else {
      throw new Error(
        'The @Visibility decorator can only be applied to methods.'
      );
    }
  };
}
