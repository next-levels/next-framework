import { Action, ActionReducer } from '@ngrx/store';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createGenericActions } from './generic.actions';
export declare function createBaseReducers<EntityType, EntityPaginatedData extends EntityState<EntityType>>(entityName: string, actions: ReturnType<typeof createGenericActions>, entityAdapter: EntityAdapter<EntityType>): ActionReducer<EntityPaginatedData, Action>;
