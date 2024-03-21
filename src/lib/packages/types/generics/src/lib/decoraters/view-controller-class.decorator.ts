import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import {
  decorator_models,
  decorator_models_key,
  decorator_models_options,
  view_controller_models_key
} from '../helpers/meta-data.helper';
import { ModelOptions } from '../types/options/model-options';
import {ViewControllerOptions} from "../types/options/view-controller-options";
export const VIEWCLASS_PREFIX = 'vc:models';
export const VIEWCLASS_OPTIONS_PREFIX = 'vc:models:options';
export const VIEWCLASS_ALL_PREFIX = 'vc:models:all';

export function ViewController(config: ViewControllerOptions) {
  const options = config;
  const name: string = config.name;


  return (constructor: Constructor) => {
    const variables =
      Reflect.getMetadata(VIEWCLASS_ALL_PREFIX, constructor) || [];
    variables.push(name);
    Reflect.defineMetadata(VIEWCLASS_ALL_PREFIX, variables, constructor);
    Reflect.defineMetadata(VIEWCLASS_PREFIX, name, constructor);
    Reflect.defineMetadata(VIEWCLASS_OPTIONS_PREFIX, options, constructor);

    if(!view_controller_models_key.has(name) && typeof config === 'string'){
      view_controller_models_key.set(name, constructor);
    }
   };
}


