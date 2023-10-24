import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { NotificationService } from './notification.service';
import { NotificationData } from './notification.data';
import { NotificationStore } from './notification.store';
import { NotificationEffects } from './notification.effects';
import { NotificationFacade } from './notification.facede';
import { Observable } from 'rxjs';
import { EffectsConfig } from '../../types/effects-config.type';

export function createNotificationService<T extends object>(modelUrl: string) {
  @Injectable({
    providedIn: 'root',
  })
  class ModuleService implements NotificationService<T> {
    constructor(public _http: HttpClient) {}

    resetEntity(): void {}

    setEntity(entity: T) {}
  }
  return ModuleService;
}

export function createNotificationStore<T extends object>(modelName: string) {
  class ModuleStore extends NotificationStore<T, NotificationData<T>> {
    constructor() {
      super(modelName);
    }

    static getReducers() {
      return new this().baseReducers;
    }

    static getActions() {
      return new this().baseActions;
    }

    static getSelectors() {
      return new this().baseSelectors;
    }
  }

  return ModuleStore;
}

export function createNotificationEffects<T extends object>(
  serviceToken: InjectionToken<NotificationService<T>>,
  actions: any,
  modelName: string
) {
  @Injectable()
  class ModuleEffectsClass extends NotificationEffects<T> {
    constructor(
      public override actions$: Actions,
      @Inject(serviceToken) public service: NotificationService<T>
    ) {
      super(actions$, actions, modelName);
    }
  }

  return ModuleEffectsClass;
}

export function createNotificationFacade2<T>(
  storeClass: any,
  actions: any,
  selectors: any
) {
  return new NotificationFacade<T, NotificationData<T>>(
    storeClass,
    actions,
    selectors
  );
  @Injectable({
    providedIn: 'root',
  })
  class ModuleFacade extends NotificationFacade<T, NotificationData<T>> {
    constructor(public override store: Store<NotificationData<T>>) {
      super(store, actions, selectors);
    }
  }
  return ModuleFacade;
}

export function createNotificationFacade<T, S>(
  storeClass: any,
  actions: any,
  selectors: any
) {
  @Injectable({
    providedIn: 'root',
  })
  class ModuleFacade extends NotificationFacade<T, S> {
    public override unReadCount$: Observable<number>;

    constructor(public override store: Store<S>) {
      super(store, actions, selectors);
    }
    public override setEntity(entity: T) {
      this.store.dispatch(this.baseActions.setEntity({ payload: entity }));
    }
  }
  return new ModuleFacade(storeClass); // Create and return instance of ModuleFacade, not the class itself
}

export function createNotificationEffectServicePair<T extends object>(
  config: EffectsConfig
) {
  const service = createNotificationService<T>(config.route);
  const effect = createNotificationEffects<T>(
    config.serviceToken,
    config.actions,
    config.label
  );
  return {
    serviceToken: config.serviceToken,
    service,
    effect,
  };
}
