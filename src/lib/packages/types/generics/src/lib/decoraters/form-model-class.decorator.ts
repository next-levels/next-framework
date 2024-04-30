import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { ViewControllerOptions } from '../types/options/view-controller-options';
import { form_controller_models_key } from '../helpers/meta-data.helper';

export const FORMCLASS_PREFIX = 'fc:models';
export const FORMCLASS_OPTIONS_PREFIX = 'fc:models:options';
export const FORMCLASS_ALL_PREFIX = 'fc:models:all';

export function FormModel(config: ViewControllerOptions) {
  const options = config;
  const name: string = config.name;

  return (constructor: Constructor) => {
    const variables =
      Reflect.getMetadata(FORMCLASS_ALL_PREFIX, constructor) || [];
    variables.push(name);
    Reflect.defineMetadata(FORMCLASS_ALL_PREFIX, variables, constructor);
    Reflect.defineMetadata(FORMCLASS_PREFIX, name, constructor);
    Reflect.defineMetadata(FORMCLASS_OPTIONS_PREFIX, options, constructor);

    if (!form_controller_models_key.has(name)) {
      form_controller_models_key.set(name, constructor);
    }
  };
}
