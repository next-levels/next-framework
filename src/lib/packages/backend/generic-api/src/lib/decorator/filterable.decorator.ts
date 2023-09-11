import 'reflect-metadata';
export const FILTERABLE_ALL_PREFIX = 'lc:filterable:all';

export function Filterable(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const fileFields = Reflect.getMetadata(FILTERABLE_ALL_PREFIX, target) || [];

    fileFields.push(propertyKey);

    Reflect.defineMetadata(FILTERABLE_ALL_PREFIX, fileFields, target);
  };
}
