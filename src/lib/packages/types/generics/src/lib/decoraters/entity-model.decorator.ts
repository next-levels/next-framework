import { Entity } from 'typeorm';
import { Constructor } from '../types/Constructor';

export const registeredEntities: Map<string, any> = new Map();

export function EntityModel(options?: any) {
  console.log('EntityModel options', options);
  return function (constructor: Function) {
    if (!registeredEntities.has(options.name)) {
      registeredEntities.set(options.name, constructor);
    }

    Entity(options)(constructor);
  };
}

export function getEntityByName(name: string): Constructor | undefined {
  console.log(registeredEntities);
  const model = registeredEntities.get(name);
  if (model) {
    return model;
  } else {
    // Handle the case where no model was found.
    console.log('No model found with the given name.');
  }

  // if no model found, return undefined
  return undefined;
}
