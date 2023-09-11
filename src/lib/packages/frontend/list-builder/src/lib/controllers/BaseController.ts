import 'reflect-metadata';
import {
  BaseFacadeType,
  BasicFacade,
} from 'libs/angular/features/generic-store/src';
import { META, ModelOptions } from '@nxtlvls/generic-types';

export class BaseController {
  protected model: any;
  protected modelDefinition: any = null;
  protected facade: BaseFacadeType;
  private modelClassName: string;

  constructor(model: any, facade: BaseFacadeType, modelDefinition: any = null) {
    this.facade = facade;
    this.model = model;
    this.modelDefinition = modelDefinition;
    this.modelClassName = META.getNameByModel(this.modelDefinition);

    console.log(this.facade);
  }

  getClassName() {
    return META.getNameByModel(this.getModelDefinition());
  }
  getModel() {
    return this.model;
  }

  getModelClassName() {
    return this.modelClassName;
  }

  getModelName() {
    return this.model;
  }

  getModelOptions(model?): ModelOptions {
    if (model) {
      return META.getOptionsByModel(model);
    }
    return META.getOptionsByModel(this.modelDefinition);
  }

  getFacade() {
    return this.facade;
  }

  getValue(name: string) {
    return this.model[name as keyof typeof this.model] || null;
  }

  getModelDefinition() {
    return this.modelDefinition;
  }

  getElementLabel(fieldName: string) {
    return this.getModelClassName() + '.properties.' + fieldName;
  }
}
