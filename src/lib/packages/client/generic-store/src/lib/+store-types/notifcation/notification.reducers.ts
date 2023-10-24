import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createNotificationActions } from './notification.actions';

export function createNotificationReducer<EntityType>(
  entityName: string,
  actions: ReturnType<typeof createNotificationActions<EntityType>>,
  entityAdapter: EntityAdapter<EntityType>
): ActionReducer<EntityState<EntityType>> {
  {
    return createReducer<EntityState<EntityType>>(
      entityAdapter.getInitialState({ unReadCount: 0,updated: Date.now() }),

      on(actions.setEntity, (state: any, payload) => {
        return entityAdapter.addOne((<any>payload).payload, {
          ...state,
          unReadCount: state.unReadCount + 1,
        });
      }),
      on(actions.resetCount, (state) => ({
        ...state,
        updated: Date.now(),
        unReadCount: 0,
      }))
    );
  }
}

export function createNotificationReducerState<
  EntityType,
  EntityData extends EntityState<EntityType>
>(
  entityName: string,
  actions: ReturnType<typeof createNotificationActions<EntityType>>,
  entityAdapter: EntityAdapter<EntityType>
): ActionReducer<EntityData> {
  {
    return createReducer<EntityData>(
      entityAdapter.getInitialState() as EntityData,

      on(actions.setEntity, (state: any, payload) => {
        return entityAdapter.addOne((<any>payload).payload, {
          ...state,
          unReadCount: state.unReadCount + 1,
        });
      }),
      on(actions.resetCount, (state) => ({
        ...state,
        updated: Date.now(),
        unReadCount: 0,
      }))
    );
  }
}
