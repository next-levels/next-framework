import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { view_controller_models_key } from '../helpers/meta-data.helper';
import { ViewControllerOptions } from '../types/options/view-controller-options';

export const VIEWCLASS_PREFIX = 'vc:models';
export const VIEWCLASS_OPTIONS_PREFIX = 'vc:models:options';
export const VIEWCLASS_ALL_PREFIX = 'vc:models:all';

/**
 * @deprecated
 */
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

    if (!view_controller_models_key.has(name)) {
      view_controller_models_key.set(name, constructor);
    }
  };
}
