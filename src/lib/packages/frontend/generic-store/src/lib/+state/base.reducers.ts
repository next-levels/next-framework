import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState } from '@ngrx/entity';
import { createGenericActions } from './generic.actions';
import { EntityPaginated } from '../../../../../shared/generics/src';

export function createBaseReducers<
  EntityType,
  EntityPaginatedData extends EntityState<EntityType>
>(
  entityName: string,
  actions: ReturnType<typeof createGenericActions>,
  entityAdapter: EntityAdapter<EntityType>
): ActionReducer<EntityPaginatedData, Action> {
  return createReducer<EntityPaginatedData>(
    entityAdapter.getInitialState() as EntityPaginatedData,
    on(actions.load, (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
    on(actions.loadSuccess, (state, { payload: entities }) => {
      return entityAdapter.setAll(entities, state);
    }),
    on(actions.loadFail, (state, { error }) => ({
      ...state,
      loaded: false,
      loading: false,
      error: error,
    })),

    // Filtered
    on(actions.loadEntitiesFiltered, (state) => ({
      ...state,
      loaded: false,
      loading: true,
      error: null,
    })),

    on(actions.loadEntitiesFilteredSuccess, (state, { payload: paginated }) => {
      return entityAdapter.setAll(
        (<EntityPaginated<EntityType>>paginated).data,
        {
          ...state,
          loaded: true,
          pagination_meta: paginated.meta,
          loading: false,
        }
      );
    }),
    on(actions.loadEntitiesFilteredFail, (state, { error }) =>
      entityAdapter.removeAll({
        ...state,
        error,
        loaded: true,
        loading: false,
      })
    ),

    // Select
    on(actions.selectEntity, (state, { payload }) => {
      return {
        ...state,
        selectedEntityId: payload.entityId,
        loaded: false,
        loading: true,
      };
    }),
    on(actions.selectEntitySuccess, (state, { payload }) => {
      return entityAdapter.setOne(payload.entity as EntityType, {
        ...state,
        loaded: true,
        loading: false,
      });
    }),

    // Add
    on(actions.addEntity, (state) => ({
      ...state,
      loaded: false,
      loading: true,
      error: null,
    })),
    on(actions.addEntitySuccess, (state, { payload }) => {
      return entityAdapter.addOne(<EntityType>payload.entity, {
        ...state,
        loading: false,
      });
    }),
    on(actions.addEntityFail, (state, { error }) => ({
      ...state,
      loading: false,
    })),

    // Edit
    on(actions.editEntity, (state, { payload: { entity } }) => {
      return entityAdapter.updateOne(
        {
          id: entity.id as number,
          changes: entity.changes as EntityType,
        },
        {
          ...state,
          loading: true,
        }
      );
    }),
    on(actions.editEntitySuccess, (state) => ({
      ...state,
      loading: false,
    })),
    on(actions.editEntityFail, (state, { error }) => ({
      ...state,
      loading: false,
    })),

    // Delete
    on(actions.deleteEntity, (state) => ({
      ...state,
      loading: true,
    })),
    on(actions.deleteEntitySuccess, (state, { payload }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return entityAdapter.removeOne(payload.entity.id, {
        ...state,
        loading: false,
      });
    }),
    on(actions.deleteEntityFail, (state, { error }) => ({
      ...state,
      loading: false,
    })),

    // Export
    on(actions.exportEntities, (state) => ({
      ...state,
      loading: true,
    })),
    on(actions.exportEntitiesSuccess, (state) => ({
      ...state,
      loading: false,
    })),
    on(actions.exportEntitiesFail, (state) => ({
      ...state,
      loading: false,
    }))
  );
}
