import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs';
import { FilterOptions, PaginationMeta } from '@next-levels/types';

export interface BasicFacade<EntityType> {
  all$: Observable<EntityType[]>;
  loaded$: Observable<boolean>;
  pagination$: Observable<PaginationMeta | null>;
  filtered$: Observable<EntityType[]>;
  loadAll(): void;
  loadFiltered(filterOptions: FilterOptions): void;
  select(entityId: number): void;
  add(entity: EntityType): void;
  update(entity: Update<EntityType>): void;
  delete(entity: EntityType): void;
  batchDelete(entities: EntityType[]): void;
  batchEdit(ids: number[], changes: Partial<EntityType>): void;
}
