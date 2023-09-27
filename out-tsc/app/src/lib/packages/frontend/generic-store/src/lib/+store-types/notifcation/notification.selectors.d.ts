import { EntityAdapter } from '@ngrx/entity';
export declare function createNotificationSelectors<EntityType, StateType>(featureKey: string, entityAdapter: EntityAdapter<EntityType>): any;
export declare function createNotificationSelectorsFeature<EntityType, StateType extends object>(featureKey: string, entityAdapter: EntityAdapter<EntityType>): any;
export type NotificationSelectors<EntityType, StateType> = {
    getEntityNotificationCount: (state: StateType) => number;
};
