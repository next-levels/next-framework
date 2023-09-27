import { InjectionToken } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseFacade } from './base.facede';
import { NotificationFacade } from '../+store-types/notifcation/notification.facede';
export declare function createGenericFacade<T extends Object, S>(modelName: string, storeToken: InjectionToken<any>, features: string[], entity: T): {
    new (store: Store<S>, genericStore: any): {
        base: BaseFacade<T, S>;
        notification: NotificationFacade<T, S>;
        selectors: Record<string, (arg: any) => Observable<any>>;
        store: Store<S>;
        genericStore: any;
    };
};
