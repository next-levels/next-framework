import 'reflect-metadata';

import { RELATION_ALL_PREFIX } from '../decorator/relation.decorator';
import { BUILDERFIELD_ALL_PREFIX } from '@nxtlvls/generic-types';

export function getFilterFields(entity: any): any[] {
  const fileFields = Reflect.getMetadata(
    BUILDERFIELD_ALL_PREFIX,
    entity.prototype
  );

  return fileFields;
}

export function getRelationFields(entity: any): any[] {
  const fileFields = Reflect.getMetadata(
    RELATION_ALL_PREFIX,
    entity?.prototype
  );
  return fileFields;
}
