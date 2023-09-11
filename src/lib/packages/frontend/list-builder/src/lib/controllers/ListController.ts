import 'reflect-metadata';
import {
  BasicFacade,
  FacadeRegistry,
} from 'libs/angular/features/generic-store/src';
import { BaseController } from './BaseController';
import { ScopeFilter } from '@nxtlvls/generic-types';

export class ListController extends BaseController {
  scope: ScopeFilter[] = [];

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

  setScope(key: string, operation: string, value: any) {
    this.scope.push({ key: key, operation: operation, value: value });
  }

  getScope() {
    return this.scope;
  }
}
