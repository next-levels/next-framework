import { ActionReducer } from '@ngrx/store';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createNotificationActions } from './notification.actions';
export declare function createNotificationReducer<EntityType>(entityName: string, actions: ReturnType<typeof createNotificationActions<EntityType>>, entityAdapter: EntityAdapter<EntityType>): ActionReducer<EntityState<EntityType>>;
export declare function createNotificationReducerState<EntityType, EntityData extends EntityState<EntityType>>(entityName: string, actions: ReturnType<typeof createNotificationActions<EntityType>>, entityAdapter: EntityAdapter<EntityType>): ActionReducer<EntityData>;
