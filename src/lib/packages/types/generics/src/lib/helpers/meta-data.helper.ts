import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { MODELCLASS_OPTIONS_PREFIX } from '../decoraters/model-class.decorator';
import { ModelOptions } from '../types/options/model-options';
export const decorator_models: Constructor[] = [];

const MODELCLASS_PREFIX = 'fb:models';

export class META {
  static getModelByName(name: string): Constructor | undefined {
    for (const model of decorator_models) {
      if (Reflect.getMetadata(MODELCLASS_PREFIX, model) === name) {
        if (model) {
          return new model();
        } else {
          // Handle the case where no model was found.
          console.log('No model found with the given name.');
        }
      }
    }

    // if no model found, return undefined
    return undefined;
  }

  static getNameByModel(constructor: Constructor): string | undefined {
    return Reflect.getMetadata(MODELCLASS_PREFIX, constructor.constructor);
  }

  static getOptionsByModel(constructor: Constructor): ModelOptions | undefined {
    return Reflect.getMetadata(
      MODELCLASS_OPTIONS_PREFIX,
      constructor.constructor
    );
  }

  static getPrefixByModel(constructor: Constructor): ModelOptions | undefined {
    return Reflect.getMetadata(MODELCLASS_PREFIX, constructor.constructor);
  }
}
