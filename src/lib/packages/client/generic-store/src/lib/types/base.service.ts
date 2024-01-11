import { Observable } from 'rxjs';
import { EntityPaginated, FilterOptions } from '@next-levels/types';

export interface BaseService<EntityType extends object> {
  getAll(): Observable<EntityType[]>;
  findByFilter(
    filterOptions: FilterOptions
  ): Observable<EntityPaginated<EntityType>>;
  getEntity(entityId: number | string): Observable<EntityType>;
  addEntity(entity: EntityType): Observable<EntityType>;
  deleteEntity(entity: EntityType): Observable<EntityType>;
  updateEntity(
    entityId: number | string,
    changes: Partial<EntityType>
  ): Observable<EntityType>;
  batchDeleteEntities(entities: EntityType[]): Observable<EntityType[]>;
  batchEditEntities(
    entityIds: number[],
    changes: Partial<EntityType>
  ): Observable<EntityType>;
}
