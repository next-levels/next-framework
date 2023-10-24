import 'reflect-metadata';
import {ExportOptions} from "../types/options/export-options";

export const EXPORT_PREFIX = 'fb:export';
export const EXPORT_PREFIX_ALL = 'fb:export:all';

export function Export(options: ExportOptions) {
  return (target: object, key: string) => {
    if (options !== undefined && options !== null) {
      const all = Reflect.getMetadata(EXPORT_PREFIX_ALL, target) || [];
      all.push(key);
      Reflect.defineMetadata(EXPORT_PREFIX_ALL, all, target);

      return Reflect.defineMetadata(EXPORT_PREFIX, options, target, key);
    } else {
      throw new Error(
        'The @Visibility decorator can only be applied to methods.'
      );
    }
  };
}
