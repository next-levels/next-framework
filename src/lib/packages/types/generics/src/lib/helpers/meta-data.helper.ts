import 'reflect-metadata';
import { Constructor } from '../types/Constructor';
import { MODELCLASS_OPTIONS_PREFIX } from '../decoraters/model-class.decorator';
import { ModelOptions } from '../types/options/model-options';

export const decorator_models: Constructor[] = [];
export const decorator_models_options: any[] = [];
export const decorator_models_key: Map<string, any> = new Map();

/**
 * @deprecated
 */
export const view_controller_models_key: Map<string, any> = new Map();
export const form_controller_models_key: Map<string, any> = new Map();

export const list_controller_models_key: Map<string, any> = new Map();

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

  /**
   * @deprecated
   */
  static getViewController(constructor: Constructor): Constructor | undefined {
    const name = Reflect.getMetadata(
      MODELCLASS_PREFIX,
      constructor.constructor
    );
    const model = view_controller_models_key.get(name);
    if (model) {
      return new model();
    } else {
      // Handle the case where no model was found.
      console.log('No model found with the given name.');
    }

    // if no model found, return undefined
    return undefined;
  }

  /**
   * @deprecated
   */
  static getViewControllerByName(name: string): Constructor | undefined {
    const model = view_controller_models_key.get(name);
    if (model) {
      return new model();
    } else {
      // Handle the case where no model was found.
      console.log('No model found with the given name.');
    }

    // if no model found, return undefined
    return undefined;
  }

  static getModelsForFeature(key: string): any[] {
    return decorator_models_options.filter((model) =>
      model.features.includes(key)
    );
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

  static getFormController(constructor: Constructor): Constructor | undefined {
    const name = Reflect.getMetadata(
      MODELCLASS_PREFIX,
      constructor.constructor
    );
    const model = form_controller_models_key.get(name);
    if (model) {
      return new model();
    } else {
      // Handle the case where no model was found.
      console.log('No model found with the given name.');
    }

    // if no model found, return undefined
    return undefined;
  }

  static getFormControllerByName(name: string): Constructor | undefined {
    const model = form_controller_models_key.get(name);
    if (model) {
      return new model();
    } else {
      // Handle the case where no model was found.
      console.log('No model found with the given name.');
    }

    // if no model found, return undefined
    return undefined;
  }

  static getListController(constructor: Constructor): Constructor | undefined {
    const name = Reflect.getMetadata(
      MODELCLASS_PREFIX,
      constructor.constructor
    );
    console.log('name', name);
    console.log('list_controller_models_key', list_controller_models_key);
    const model = list_controller_models_key.get(name);
    if (model) {
      return new model();
    } else {
      // Handle the case where no model was found.
      console.log('No model found with the given name.');
    }

    // if no model found, return undefined
    return undefined;
  }

  static getListControllerByName(name: string): Constructor | undefined {
    const model = list_controller_models_key.get(name);
    if (model) {
      return new model();
    } else {
      // Handle the case where no model was found.
      console.log('No model found with the given name.');
    }

    // if no model found, return undefined
    return undefined;
  }
}
