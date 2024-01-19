import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import {decorator_models, decorator_models_options} from '../helpers/meta-data.helper';
import { ModelOptions } from '../types/options/model-options';
export const MODELCLASS_PREFIX = 'fb:models';
export const MODELCLASS_OPTIONS_PREFIX = 'fb:models:options';
export const MODELCLASS_ALL_PREFIX = 'fb:models:all';

export function Model(config: string | ModelOptions) {
  let options: ModelOptions | null = null;
  let name: string = '';

  if (typeof config === 'string') {
    name = config;
    options = { name, label: '', features: [], url: '' };
  }
  if (typeof config === 'object') {
    name = config.name;
    options = config;
  }

  return (constructor: Constructor) => {
    const variables =
      Reflect.getMetadata(MODELCLASS_ALL_PREFIX, constructor) || [];
    variables.push(name);
    Reflect.defineMetadata(MODELCLASS_ALL_PREFIX, variables, constructor);
    Reflect.defineMetadata(MODELCLASS_PREFIX, name, constructor);
    Reflect.defineMetadata(MODELCLASS_OPTIONS_PREFIX, options, constructor);
    decorator_models_options.push(options); // push the constructor to the array
    decorator_models.push(constructor); // push the constructor to the array
  };
}

export function getModelByName(name: string) {
  // search through the models for one with a matching name
  for (const model of decorator_models) {
    if (Reflect.getMetadata(MODELCLASS_PREFIX, model) === name) {
      return model;
    }
  }

  // if no model found, return undefined
  return undefined;
}
