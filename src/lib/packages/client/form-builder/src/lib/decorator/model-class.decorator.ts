import 'reflect-metadata';
import {
  Constructor,
  decorator_models,
} from '@next-levels/types';
export const MODELCLASS_PREFIX = 'fb:models';
export const MODELCLASS_ALL_PREFIX = 'fb:models:all';

export function Model(name: string) {
  return (constructor: Constructor) => {
    const variables =
      Reflect.getMetadata(MODELCLASS_ALL_PREFIX, constructor) || [];
    variables.push(name);
    Reflect.defineMetadata(MODELCLASS_ALL_PREFIX, variables, constructor);
    Reflect.defineMetadata(MODELCLASS_PREFIX, name, constructor);

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
