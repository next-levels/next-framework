import { Action, ActionReducer } from '@ngrx/store';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createGenericActions } from './generic.actions';
export declare function createGenericReducer<EntityType>(entityName: string, actions: ReturnType<typeof createGenericActions>, entityAdapter: EntityAdapter<EntityType>): ActionReducer<EntityState<EntityType>, Action>;
export declare function createGenericReducerState<EntityType, EntityData extends EntityState<EntityType>>(entityName: string, actions: ReturnType<typeof createGenericActions>, entityAdapter: EntityAdapter<EntityType>): ActionReducer<EntityData, Action>;
