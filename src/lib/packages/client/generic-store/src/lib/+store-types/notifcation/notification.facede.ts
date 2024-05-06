import { Store } from '@ngrx/store';
import { createNotificationActions } from './notification.actions';
import { Observable } from 'rxjs';
import { StoreFacade } from '../../factory/base.facede';

export interface NotificationTypeFacade<EntityType> {
  setEntity(entity: EntityType): void;

  resetCount(entity: EntityType): void;

  unReadCount$: Observable<number>;
  updated$: Observable<Date>;
}

export type NotificationTypeSelectors<EntityType, StateType> = {
  getEntityNotificationCount: (state: StateType) => number;
  getEntityNotificationUpdated: (state: StateType) => Date;
};

export class NotificationFacade<EntityType, StateType>
  extends StoreFacade
  implements NotificationTypeFacade<EntityType>
{
  public unReadCount$: Observable<number>;
  public updated$: Observable<Date>;

  constructor(
    public store: Store<StateType>,
    public baseActions: ReturnType<
      typeof createNotificationActions<EntityType>
    >,
    public baseSelectors: NotificationTypeSelectors<EntityType, StateType>
  ) {
    super();
    if (this.baseSelectors) {
      this.unReadCount$ = this.store.select(
        this.baseSelectors.getEntityNotificationCount
      );
      this.updated$ = this.store.select(
        this.baseSelectors.getEntityNotificationUpdated
      );
    }
  }

  public setEntity(entity: EntityType) {
    this.store.dispatch(this.baseActions.setEntity({ payload: entity }));
  }

  public resetCount(entity: EntityType) {
    this.store.dispatch(this.baseActions.resetCount({ payload: entity }));
  }
}
