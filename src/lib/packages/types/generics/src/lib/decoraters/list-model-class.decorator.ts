import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { ViewControllerOptions } from '../types/options/view-controller-options';
import { list_controller_models_key } from '../helpers/meta-data.helper';

export const LISTCLASS_PREFIX = 'lc:models';
export const LISTCLASS_OPTIONS_PREFIX = 'lc:models:options';
export const LISTCLASS_ALL_PREFIX = 'lc:models:all';

export function ListModel(config: ViewControllerOptions) {
  const options = config;
  const name: string = config.name;

  return (constructor: Constructor) => {
    const variables =
      Reflect.getMetadata(LISTCLASS_ALL_PREFIX, constructor) || [];
    variables.push(name);
    Reflect.defineMetadata(LISTCLASS_ALL_PREFIX, variables, constructor);
    Reflect.defineMetadata(LISTCLASS_PREFIX, name, constructor);
    Reflect.defineMetadata(LISTCLASS_OPTIONS_PREFIX, options, constructor);

    if (!list_controller_models_key.has(name)) {
      list_controller_models_key.set(name, constructor);
    }
  };
}
