import { EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer } from '@ngrx/store';
import { createNotificationActions } from './notification.actions';
import { createNotificationReducer } from './notification.reducers';
import { createNotificationSelectors } from './notification.selectors';
import { NotificationData } from './notification.data';
export declare abstract class NotificationStore<EntityType extends object, StateType extends NotificationData<EntityType>> {
    entityName: string;
    featureKey: string;
    adapter: EntityAdapter<EntityType>;
    baseActions: ReturnType<typeof createNotificationActions<EntityType>>;
    baseReducers: typeof createNotificationReducer<EntityType>;
    baseSelectors: typeof createNotificationSelectors<EntityType, StateType>;
    protected constructor(entityName: string);
    get baseReducer(): ActionReducer<EntityState<EntityType>, Action>;
}
