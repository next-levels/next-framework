import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { EffectsConfig } from '../types/effects-config.type';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../types/base.service';

import { GenericEffects } from '../+state/generic.effects';
import { BaseFacade } from './base.facede';
import {EntityPaginated, FilterOptions} from "@next-levels/types";

export function createBaseService<T extends object>(modelUrl: string) {
  @Injectable({
    providedIn: 'root',
  })
  class GenericService implements BaseService<T> {
    constructor(public _http: HttpClient) {}

    getEntity(id: number|string): Observable<T> {
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

    updateEntity(id: number|string, data: Partial<T>): Observable<T> {
      console.log('updateEntity', id, data)
      return this._http.patch<T>(modelUrl + '/' + id, data);
    }
  }

  return GenericService;
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
      public override translateService: TranslateService
    ) {
      super(actions$, service, actions, name, label, translateService);
    }
  }

  return GenericEffectsClass;
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
