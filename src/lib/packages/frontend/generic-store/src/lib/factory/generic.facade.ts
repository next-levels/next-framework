import {
  BaseFacade,
  createBaseFacadeInstance,
  createNotificationFacade,
  NotificationFacade,
} from '@nxtlvls/generic-store';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { BaseGenericFacade } from '../types/base-generic.facade';
import { Observable } from 'rxjs';
import { TireGuarantee } from '@kumho-cms/data-models';
import * as moment from 'moment';

type FunctionObject = {
  key: string;
  func: (arg: any) => Observable<any>;
};

interface MinimumConstructable {
  new (): any;
}

export function createGenericFacade<T extends Object, S>(
  modelName: string,
  storeToken: InjectionToken<any>,
  features: string[] = ['notification', 'basic'],
  entity: T
) {
  @Injectable({
    providedIn: 'root',
  })
  class GenericFacade {
    base: BaseFacade<T, S>;
    notification: NotificationFacade<T, S>;
    selectors: Record<string, (arg: any) => Observable<any>>;
    constructor(
      public store: Store<S>,
      @Inject(storeToken) public genericStore: any
    ) {
      if (features.includes('notification')) {
        this.notification = createNotificationFacade<T, S>(
          store,
          genericStore.baseActions,
          genericStore.baseSelectors
        );
      }
      this.base = createBaseFacadeInstance<T, S>(
        store,
        genericStore.baseActions,
        genericStore.baseSelectors
      );

      const EntityConstructor = entity as unknown as MinimumConstructable & {
        dynamicFilters: any[];
      };
      const dynamicFilters = EntityConstructor.dynamicFilters;
       const dynamicFilterMap: Record<string, any> = {};
      if (Array.isArray(dynamicFilters)) {
        for (const filter of dynamicFilters) {
          const { key, func } = filter;
          const dynamicSelector = createSelector(
            genericStore.baseSelectors.getEntities,
            func
          );
          dynamicFilterMap[key] = this.store.select(dynamicSelector);
        }
      }

       this.selectors = dynamicFilterMap as Record<
        string,
        (arg: any) => Observable<any>
      >;

     }
  }


  return GenericFacade;
}
