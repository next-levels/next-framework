import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  BaseService,
  createBaseEffectServicePair,
  createNotificationEffectServicePair,
  createNotificationActions,
  createGenericActions,
  createNotificationSelectorsFeature,
  createGenericSelectorsFeature,
  createGenericReducerState,
  StoreFeatureConfig,
} from '@nxtlvls/generic-store';
import {
  Constructor,
  EntityPaginated,
  FilterOptions,
  META,
} from '@nxtlvls/generic-types';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducers } from './reducer.factory';
import { EffectsConfig } from '../types/effects-config.type';
import { createGenericFacade } from './generic.facade';

type ActionType<T> = (moduleName: string) => any;
export type SelectorType<T, S> = (
  moduleName: string,
  adapter: EntityAdapter<T>
) => any;
type ReducerType<T, S> = (
  moduleName: string,
  actions: any,
  adapter: EntityAdapter<T>
) => any;

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export function createService<T extends object>(modelUrl: string) {
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

export function createGenericStore<T extends object, S>(
  modelName: string,
  funcArray: Array<ActionType<T>>,
  selectorArray: Array<SelectorType<T, S>>,
  features: string[] = ['notification', 'basic']
) {
  class GenericStore {
    public featureKey: string;
    public adapter: EntityAdapter<T> = createEntityAdapter<T>();

    public baseActions: any;
    public baseReducers: any;

    public baseSelectors: any;

    constructor() {
      this.featureKey = modelName;

      let actionInstances: any[] = [];
      for (let func of funcArray) {
        actionInstances.push(func(modelName));
      }
      this.baseActions = actionInstances.reduce(
        (combinedActions, actions) => ({ ...combinedActions, ...actions }),
        {}
      );

      let selectorInstances: any[] = [];
      for (let func of selectorArray) {
        selectorInstances.push(func(modelName, this.adapter));
      }
      this.baseSelectors = selectorInstances.reduce(
        (combinedSelectors, selectors) => ({
          ...combinedSelectors,
          ...selectors,
        }),
        {}
      );

      this.baseReducers = createReducers(
        features,
        modelName,
        this.baseActions,
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

function getEffectService(
  feature: string,
  actions: any,
  name: string,
  route: string,
  label = ''
) {
  const serviceToken = new InjectionToken(`${name}${feature}Service`);
  const config: EffectsConfig = {
    name,
    route,
    actions,
    serviceToken,
    label,
  };

  switch (feature) {
    case 'base':
      return createBaseEffectServicePair(config);
    case 'notification':
      return createNotificationEffectServicePair(config);

    default:
      throw new Error(`Feature ${feature} not found`);
  }
}

function getAction(feature: string) {
  switch (feature) {
    case 'base':
      return createGenericActions;
    case 'notification':
      return createNotificationActions;

    default:
      throw new Error(`Feature ${feature} not found`);
  }
}

function getSelector(feature: string) {
  switch (feature) {
    case 'base':
      return createGenericSelectorsFeature;
    case 'notification':
      return createNotificationSelectorsFeature;

    default:
      throw new Error(`Feature ${feature} not found`);
  }
}

export function getStoreFeatures<T extends object, S extends object>(
  entity: any,
  config: StoreFeatureConfig<T, S>
) {
  const funcArray: Array<ActionType<T>> = [];
  const selectorArray: Array<SelectorType<T, S>> = [];
  const effectsList: any[] = [];
  const StoreToken = new InjectionToken(name + 'Store');
  const FacadeToken = new InjectionToken<string>(name + 'Facade');

  config.name = META.getNameByModel(entity.prototype);

  for (const feature of config.features) {
    const action = getAction(feature);
    if (action) {
      funcArray.push(action);
    }

    const selector = getSelector(feature);
    if (selector) {
      selectorArray.push(selector);
    }
  }

  if (config.selectors) {
    for (const selector of config.selectors) {
      if (selector) {
        selectorArray.push(selector);
      }
    }
  }

  const store = new (createGenericStore<T, S>(
    config.name,
    funcArray,
    selectorArray,
    config.features
  ))();

  for (const feature of config.features) {
    const effectService = getEffectService(
      feature,
      store.baseActions,
      config.name,
      config.route,
      config.label
    );
    if (effectService) {
      effectsList.push(effectService);
    }
  }

  const facade = createGenericFacade<T, S>(
    config.name,
    StoreToken,
    config.features,
    entity
  );

  return {
    facade: facade,
    facadeToken: FacadeToken,
    storeToken: StoreToken,
    store: store,
    effects: effectsList.map((pair) => pair.effect),
    services: effectsList.map((pair) => ({
      provide: pair.serviceToken,
      useClass: pair.service,
    })),
  };
}
