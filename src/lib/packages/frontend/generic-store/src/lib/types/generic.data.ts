import { Dictionary, EntityState } from '@ngrx/entity';
import { PaginationMeta } from '@nxtlvls/generic-types';

export interface GenericData<EntityType> extends EntityState<EntityType> {
  selectedEntityId: string | number;
  loading: boolean;
  pagination_meta: PaginationMeta | null;
  error: '';
  entities: Dictionary<EntityType>;
}
