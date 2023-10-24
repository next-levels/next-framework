import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { GenericData } from '../types/generic.data';
import { createGenericActions } from '../+state/generic.actions';

export function createGenericAdapter<EntityType>(): EntityAdapter<EntityType> {
  return createEntityAdapter<EntityType>();
}

export function createGenericInitialState<EntityType>(
  entityActions: ReturnType<typeof createGenericActions>,
  entityAdapter: EntityAdapter<EntityType>
): GenericData<EntityType> {
  return {
    ...entityAdapter.getInitialState(),
    ...entityActions,
    error: '',
    pagination_meta: null,
    selectedEntityId: '',
    loading: false,
  };
}
