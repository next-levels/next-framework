import 'reflect-metadata';

import { RELATION_ALL_PREFIX } from '../decorator/relation.decorator';
import { BUILDERFIELD_ALL_PREFIX } from '@next-levels/types';
import { EntityMetadata } from 'typeorm';

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

export function getRelationPaths(
  metadata: EntityMetadata,
  prefix = '',
  visited = new Set<string>()
): string[] {
  const paths: string[] = [];
  const entityName = metadata.tableName;

  // Prevent infinite recursion by tracking visited entities
  if (visited.has(entityName)) {
    return paths;
  }
  visited.add(entityName);

  metadata.relations.forEach((relation) => {
    const relationPath = prefix
      ? `${prefix}.${relation.propertyName}`
      : relation.propertyName;

    let isVisited = false;
    visited.forEach((value) => {
      if (relation.propertyName.includes(value)) {
        isVisited = true;
        return;
      }
    });
    if (!isVisited) {
      paths.push(relationPath);

      const nestedMetadata = relation.inverseEntityMetadata;
      if (nestedMetadata) {
        const nestedPaths = getRelationPaths(
          nestedMetadata,
          relationPath,
          visited
        );
        paths.push(...nestedPaths);
      }
    }
  });

  return paths;
}
