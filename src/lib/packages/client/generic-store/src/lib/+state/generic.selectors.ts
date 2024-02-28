import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { GenericData } from '../types/generic.data';
import { BaseSelectors } from '../types/base.selectors';
import * as CryptoJS from 'crypto-js';

export function createGenericSelectors<
  EntityType,
  StateType extends GenericData<EntityType>
>(
  featureKey: string,
  entityAdapter: EntityAdapter<EntityType>
): BaseSelectors<EntityType, StateType> {
  const getEntityState = createFeatureSelector<StateType>(featureKey);

  const { selectAll: getEntities, selectEntities: getEntityEntitiesOriginal } =
    entityAdapter.getSelectors(getEntityState);

  const getEntityEntities = createSelector(
    getEntityEntitiesOriginal,
    (
      entitiesDictionary: Dictionary<EntityType>
    ): Record<number, EntityType> => {
      return Object.fromEntries(
        Object.entries(entitiesDictionary).map(([key, value]) => [
          parseInt(key),
          value,
        ])
      ) as Record<number, EntityType>;
    }
  );

  const getEntityLoading = createSelector(
    getEntityState,
    (state: GenericData<EntityType>) => state.loading
  );

  const getPagination = createSelector(
    getEntityState,
    (state: GenericData<EntityType>) => {
      return state.pagination_meta;
    }
  );

  const getSelectedEntityId = createSelector(
    getEntityState,
    (state: GenericData<EntityType>) => state.selectedEntityId
  );

  const getIsLoading = createSelector(getEntityState, (state) => state.loading);

  const getSelectedEntity = createSelector(
    getEntityEntities,
    getSelectedEntityId,
    (entitiesDictionary, id) => {
      return entitiesDictionary[+id] ?? null;
    }
  );

  return {
    getEntities,
    getEntityLoading,
    getPagination,
    getEntityEntities,
    getSelectedEntityId,
    getSelectedEntity,
    getIsLoading,
  };
}

export function createGenericSelectorsFeature<
    EntityType,
  StateType extends object
>(featureKey: string, entityAdapter: EntityAdapter<EntityType>) {
  const getFeatureState = createFeatureSelector<StateType>(featureKey);

  const getEntityState = createSelector(
    getFeatureState,
    (state: any) => state.base
  );

  const { selectAll: getEntities, selectEntities: getEntityEntitiesOriginal } =
    entityAdapter.getSelectors(getEntityState);

  const getEntityEntities = createSelector(
    getEntityEntitiesOriginal,
    (
      entitiesDictionary: Dictionary<EntityType>
    ): Record<number, EntityType> => {
      return Object.fromEntries(
        Object.entries(entitiesDictionary).map(([key, value]) => [
          stringToUniqueInt(key),
          value,
        ])
      ) as Record<number, EntityType>;
    }
  );

  function stringToUniqueInt(str) {
    if(!Number.isNaN(+str)) {
        return +str;
    }
    const hash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);
    const intHash = parseInt(hash.substring(0, 12), 16);

    return intHash;
  }

  const getEntityLoading = createSelector(
    getEntityState,
    (state: GenericData<EntityType>) => state.loading
  );

  const getPagination = createSelector(
    getEntityState,
    (state: GenericData<EntityType>) => {
      return state.pagination_meta;
    }
  );

  const getSelectedEntityId = createSelector(
    getEntityState,
    (state: GenericData<EntityType>) => state.selectedEntityId
  );

  const getIsLoading = createSelector(getEntityState, (state) => state.loading);

  const getSelectedEntity = createSelector(
    getEntityEntities,
    getSelectedEntityId,
    (entitiesDictionary, id) => {

      const entitiesArray = Object.values(entitiesDictionary);
      console.log(Number.isNaN(+id) && entitiesArray[0] !== undefined && "key" in (entitiesArray[0] as any))
      if (Number.isNaN(+id) && entitiesArray[0] !== undefined && "key" in (entitiesArray[0] as any)) {
        const entitiesArray = Object.values(entitiesDictionary);
        const matchingEntity = entitiesArray.find((entity: any) => (entity as EntityType & { key: string }).key === id);
        return matchingEntity as EntityType ?? null;
      }

      console.log(entitiesDictionary, id, entitiesDictionary[+id] ?? null)
      return entitiesDictionary[+id] ?? null;
    }
  );

  return {
    getEntities,
    getEntityLoading,
    getPagination,
    getEntityEntities,
    getSelectedEntityId,
    getSelectedEntity,
    getIsLoading,
  };
}
