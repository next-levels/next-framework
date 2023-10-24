import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer } from '@ngrx/store';
import { createNotificationActions } from './notification.actions';
import { createNotificationReducer } from './notification.reducers';
import { createNotificationSelectors } from './notification.selectors';
import { NotificationData } from './notification.data';

export abstract class NotificationStore<
  EntityType extends object,
  StateType extends NotificationData<EntityType>
> {
  public featureKey: string;
  public adapter: EntityAdapter<EntityType> = createEntityAdapter<EntityType>();

  public baseActions: ReturnType<typeof createNotificationActions<EntityType>>;
  public baseReducers: typeof createNotificationReducer<EntityType>;

  public baseSelectors: typeof createNotificationSelectors<
    EntityType,
    StateType
  >;

  protected constructor(public entityName: string) {
    this.featureKey = entityName;
    this.baseActions = createNotificationActions<EntityType>(entityName);
    this.baseSelectors = createNotificationSelectors<EntityType, StateType>(
      entityName,
      this.adapter
    );
  }

  public get baseReducer(): ActionReducer<EntityState<EntityType>, Action> {
    return createNotificationReducer(
      this.entityName,
      this.baseActions,
      this.adapter
    );
  }
}
