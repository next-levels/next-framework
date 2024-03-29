import 'reflect-metadata';
import { BaseController } from './BaseController';
import { ScopeFilter } from '@next-levels/types';
import { FacadeRegistry } from '../../../../generic-store';

export class ListController extends BaseController {
  scope: ScopeFilter[] = [];
  config: any;

  constructor(model: any);
  constructor(model: any, facade: any);
  constructor(model: any, facade?: any, modelDefinition?: any);
  constructor(model: any, facade?: any, modelDefinition?: any) {
    if (!modelDefinition) {
      modelDefinition = Reflect.getMetadata('modelDefinition', model);
    }

    if (facade === undefined) {
      const myFacade = FacadeRegistry.getFacade(model.constructor.name);
      if (myFacade) {
        facade = myFacade;
      } else {
        throw new Error('No facade found for model ' + model.constructor.name);
      }
    }
    super(model, facade, modelDefinition);
  }

  setScope(key: string, operation: string, value: any = null) {
    this.scope.push({ key: key, operation: operation, value: value });
  }

  setConfig(config: any) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }

  getScope() {
    return this.scope;
  }
}
