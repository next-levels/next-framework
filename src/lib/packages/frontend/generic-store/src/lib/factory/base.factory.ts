import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { BaseActions } from '../types/base.actions';
import { BaseSelectors } from '../types/base.selectors';
import { LocalStorageEffects } from '../+state/local-storage.effects';
import { EffectsConfig } from '../types/effects-config.type';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../types/base.service';
import { EntityPaginated, FilterOptions } from '../../../../../shared/generics/src';
import { BaseStore } from './base.store';
import { GenericData } from '../types/generic.data';
import { createGenericReducer } from '../+state/generic.reducers';
import { createGenericActions } from '../+state/generic.actions';
import { GenericEffects } from '../+state/generic.effects';
import { BaseFacade } from './base.facede';

export function createBaseService<T extends object>(modelUrl: string) {
  @Injectable({
    providedIn: 'root',
  })
  class GenericService implements BaseService<T> {
    constructor(public _http: HttpClient) {}

    getEntity(id: number): Observable<T> {
      return this._http.get<T>(modelUrl + '/' + id);
    }

    getAll(): Observable<T[]> {
      return this._http.get<T[]>(modelUrl);
    }

    findByFilter(filter: FilterOptions): Observable<EntityPaginated<T>> {
      return this._http.get<EntityPaginated<T>>(`${modelUrl}/filter`, {
        params: { ...filter },
      });
    }

    addEntity(data: T): Observable<T> {
      return this._http.post<T>(modelUrl, data);
    }

    deleteEntity(entity: T): Observable<T> {
      return this._http.delete<T>(modelUrl + '/' + (entity as any).id);
    }

    updateEntity(id: number, data: Partial<T>): Observable<T> {
      return this._http.patch<T>(modelUrl + '/' + id, data);
    }
  }

  return GenericService;
}

export function createStore<T extends object>(modelName: string) {
  class GenericStore extends BaseStore<T, GenericData<T>> {
    constructor() {
      super(modelName);

      this.baseReducers = createGenericReducer(
        this.entityName,
        this.baseActions as ReturnType<typeof createGenericActions>,
        this.adapter
      );
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

  return GenericStore;
}

export function createBaseEffects<T extends object>(
  serviceToken: InjectionToken<BaseService<T>>,
  actions: any,
  name: string,
  label = ''
) {
  @Injectable()
  class GenericEffectsClass extends GenericEffects<T> {
    constructor(
      public override actions$: Actions,
      @Inject(serviceToken) public service: BaseService<T>,
      public translateService: TranslateService
    ) {
      super(actions$, service, actions, name, label, translateService);
    }
  }

  return GenericEffectsClass;
}

export function createLocalStorageEffects<T extends object>(
  serviceToken: InjectionToken<BaseService<T>>,
  storeToken: InjectionToken<BaseStore<T, GenericData<T>>>,
  modelName: string
) {
  @Injectable()
  class GenericEffectsClass extends LocalStorageEffects<T> {
    constructor(
      public override actions$: Actions,
      @Inject(serviceToken) public service: BaseService<T>,
      @Inject(storeToken) public store: BaseStore<T, GenericData<T>>
    ) {
      super(actions$, service, store.baseActions as any, modelName);
    }
  }

  return GenericEffectsClass;
}

export function createBaseFacade<T>(
  storeClass: any,
  actions: BaseActions<T>,
  selectors: BaseSelectors<T, GenericData<T>>
) {
  @Injectable({
    providedIn: 'root',
  })
  class GenericFacade extends BaseFacade<T, GenericData<T>> {
    constructor(public override store: Store<GenericData<T>>) {
      super(store, actions, selectors);
    }
  }
  return GenericFacade;
}

export function createBaseFacadeInstance<T, S>(
  storeClass: any,
  actions: any,
  selectors: any
) {
  @Injectable({
    providedIn: 'root',
  })
  class GenericFacade extends BaseFacade<T, S> {
    constructor(public override store: Store<S>) {
      super(store, actions, selectors);
    }
  }
  return new GenericFacade(storeClass);
}
export function createBaseEffectServicePair<T extends object>(
  config: EffectsConfig
) {
  const service = createBaseService<T>(config.route);
  const effect = createBaseEffects<T>(
    config.serviceToken,
    config.actions,
    config.name,
    config.label
  );
  return {
    serviceToken: config.serviceToken,
    service,
    effect,
  };
}
