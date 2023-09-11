import { Store } from '@ngrx/store';
import 'reflect-metadata';

export class BaseController {
  protected model: any;
  protected modelDefinition: any = null;
  protected store: Store<any>;

  constructor(model: any, store: Store<any>, modelDefinition: any = null) {
    this.store = store;
    this.model = model;
    this.modelDefinition = modelDefinition;
  }
  getModel() {
    return this.model;
  }

  getModelClassName() {
    return this.getModelDefinition().className;
  }

  getModelName() {
    return this.model;
  }

  getStore() {
    return this.store;
  }

  getValue(name: string) {
    return this.model[name as keyof typeof this.model] || null;
  }

  getModelDefinition() {
    return this.modelDefinition;
  }

  getElementLabel(fieldName: string) {
    return 'properties.' + this.getModelClassName() + '.' + fieldName;
  }
}
