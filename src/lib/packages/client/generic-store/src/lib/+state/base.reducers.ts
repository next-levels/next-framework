import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createGenericActions } from './generic.actions';
import { EntityPaginated } from '@next-levels/types';

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

    on(actions.loadEntitiesFiltered, (state) => {
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null,
      };
    }),

    on(actions.loadEntitiesFilteredSuccess, (state, { payload: paginated }) => {
      if (
        !paginated ||
        !Array.isArray(paginated.data) ||
        paginated.data.length === 0
      ) {
        return {
          ...state,
          loaded: false,
          loading: true,
          error: null,
        };
      }
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
      if (payload.entity === null) {
        return {
          ...state,
          loaded: false,
          loading: true,
          error: null,
        };
      } else {
        return entityAdapter.setOne(payload.entity as EntityType, {
          ...state,
          loaded: true,
          loading: false,
        });
      }
    }),
    on(actions.addEntity, (state, { payload: { entity } }) => {
      return {
        ...state,
        loaded: false,
        loading: true,
        error: null,
      };
    }),

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
          id: entity.id as string,
          changes: entity as EntityType,
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

    // batchDelete
    on(actions.batchDeleteEntities, (state) => ({
      ...state,
      loading: true,
    })),
    on(actions.batchDeleteEntitiesSuccess, (state, { payload }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const deleteIds = [];
      payload.entities.forEach((entity) => {
        deleteIds.push((entity as any).id);
      });
      return entityAdapter.removeMany(deleteIds, {
        ...state,
        loading: false,
      });
    }),
    on(actions.batchDeleteEntitiesFail, (state, { error }) => ({
      ...state,
      loading: false,
    })),

    // Batch Edit
    on(actions.batchEditEntities, (state) => ({
      ...state,
      loading: true,
    })),
    on(actions.batchEditEntitiesSuccess, (state, { payload }) => {
      console.log('payload.entities', payload.entities);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('payload.entities', payload.entities);
      return entityAdapter.updateMany(
        payload.entities as Update<EntityType>[],
        {
          ...state,
          loading: true,
        }
      );
    }),
    on(actions.batchEditEntitiesFail, (state, { error }) => ({
      ...state,
      loading: false,
      error,
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
