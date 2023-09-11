import 'reflect-metadata';
export const RELATION_ALL_PREFIX = 'lc:relation:all';

export function Relation(): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const fileFields = Reflect.getMetadata(RELATION_ALL_PREFIX, target) || [];

    fileFields.push(propertyKey);

    Reflect.defineMetadata(RELATION_ALL_PREFIX, fileFields, target);
  };
}
