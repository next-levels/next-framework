import { Store } from '@ngrx/store';
import { createNotificationActions } from './notification.actions';
import { Observable } from 'rxjs';
import { StoreFacade } from '../../factory/base.facede';
export interface NotificationTypeFacade<EntityType> {
    setEntity(entity: EntityType): void;
    unReadCount$: Observable<number>;
    updated$: Observable<number>;
}
export type NotificationTypeSelectors<EntityType, StateType> = {
    getEntityNotificationCount: (state: StateType) => number;
    getEntityNotificationUpdated: (state: StateType) => number;
};
export declare class NotificationFacade<EntityType, StateType> extends StoreFacade implements NotificationTypeFacade<EntityType> {
    store: Store<StateType>;
    baseActions: ReturnType<typeof createNotificationActions<EntityType>>;
    baseSelectors: NotificationTypeSelectors<EntityType, StateType>;
    unReadCount$: Observable<number>;
    updated$: Observable<number>;
    constructor(store: Store<StateType>, baseActions: ReturnType<typeof createNotificationActions<EntityType>>, baseSelectors: NotificationTypeSelectors<EntityType, StateType>);
    setEntity(entity: EntityType): void;
    resetCount(entity: EntityType): void;
}
