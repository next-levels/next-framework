import { InjectionToken } from '@angular/core';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducers } from './reducer.factory';
import { EffectsConfig } from '../types/effects-config.type';
import { createGenericFacade } from './generic.facade';
import { META } from '@next-levels/types';
import { createBaseEffectServicePair } from './base.factory';
import { createNotificationEffectServicePair } from '../+store-types/notifcation/notification.factory';
import { createGenericActions } from '../+state/generic.actions';
import { createNotificationActions } from '../+store-types/notifcation/notification.actions';
import { createGenericSelectorsFeature } from '../+state/generic.selectors';
import { createNotificationSelectorsFeature } from '../+store-types/notifcation/notification.selectors';
import { StoreFeatureConfig } from '../types/store-feature-config.type';

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

export function createGenericStore<T extends object, S>(
  modelName: string,
  funcArray: Array<ActionType<T>>,
  selectorArray: Array<SelectorType<T, S>>,
  features: string[] = ['notifications', 'basic']
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
    case 'notifications':
      return createNotificationEffectServicePair(config);

    default:
      return null;
  }
}

function getAction(feature: string) {
  switch (feature) {
    case 'base':
      return createGenericActions;
    case 'notifications':
      return createNotificationActions;

    default:
      return null;
  }
}

function getSelector(feature: string) {
  switch (feature) {
    case 'base':
      return createGenericSelectorsFeature;
    case 'notifications':
      return createNotificationSelectorsFeature;

    default:
      return null;
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
