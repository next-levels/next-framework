import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityAdapter } from '@ngrx/entity';
import { NotificationData } from './notification.data';
export function createNotificationSelectors<EntityType, StateType>(
  featureKey: string,
  entityAdapter: EntityAdapter<EntityType>
): any {
  const getEntityState =
    createFeatureSelector<NotificationData<EntityType>>(featureKey);

  const getEntityNotificationCount = createSelector(
    getEntityState,
    (state: NotificationData<EntityType>) => state.unReadCount
  );

  const getEntityNotificationUpdated = createSelector(
    getEntityState,
    (state: NotificationData<EntityType>) => state.updated
  );


  return {
    getEntityNotificationCount,
    getEntityNotificationUpdated
  };
}

export function createNotificationSelectorsFeature<
  EntityType,
  StateType extends object
>(featureKey: string, entityAdapter: EntityAdapter<EntityType>): any {
  const getFeatureState = createFeatureSelector<StateType>(featureKey);

  const getEntityState = createSelector(
    getFeatureState,
    (state: any) => state.notification
  );

  const getEntityNotificationCount = createSelector(
    getEntityState,
    (state: NotificationData<EntityType>) => state.unReadCount
  );

  const getEntityNotificationUpdated = createSelector(
    getEntityState,
    (state: NotificationData<EntityType>) => state.updated
  );

  return {
    getEntityNotificationCount,
    getEntityNotificationUpdated
  };
}

export type NotificationSelectors<EntityType, StateType> = {
  getEntityNotificationCount: (state: StateType) => number;
};
