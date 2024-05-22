import 'reflect-metadata';
import {
  BUILDERFIELD_ALL_PREFIX,
  BUILDERFIELD_PREFIX,
  Constructor,
  ListController,
  LISTFIELD_ALL_PREFIX,
  LISTFIELD_PREFIX,
  ListOptions,
  META,
  ScopeFilter,
} from '@next-levels/types';
import { BaseFacadeType } from '@next-levels/next-framework-client';
import { TranslateService } from '@ngx-translate/core';
import { TranslateHelper } from './translate.helper';

export class ListContext<T extends Constructor> {
  public controller: ListController<T>;
  public name: string;
  public model: any;
  public facade?: BaseFacadeType;
  public translator: TranslateHelper;
  protected entities?: T[];
  private scope: ScopeFilter[] = [];
  private fetchData = true;

  constructor(
    model: T,
    facade: BaseFacadeType,
    controller: ListController<T>,
    translateService: TranslateService
  ) {
    this.model = model;
    this.facade = facade;
    this.controller = controller;
    this.name = META.getNameByModel(model);
    this.translator = new TranslateHelper(translateService, this.name);
  }

  getField(name: string) {
    let field;
    field = this.getBuildField(name);
    field = {
      ...field,
      ...this.getSettingsField(name),
      label: this.translator.translateProperty(name),
    };

    return field;
  }

  getFields() {
    const listFields =
      Reflect.getMetadata(LISTFIELD_ALL_PREFIX, this.model) || [];

    const builderFields =
      Reflect.getMetadata(BUILDERFIELD_ALL_PREFIX, this.model) || [];

    let fields = [...builderFields, ...listFields];

    if (this.controller.listFields().length > 0) {
      fields = this.controller
        .listFields()
        .filter((field) => fields.includes(field));
    }
    return fields;
  }

  setScope(key: string, operation: string, value: any = null) {
    this.scope.push({ key: key, operation: operation, value: value });
  }

  fetch(config?: boolean | undefined) {
    this.fetchData = config ?? this.fetchData;
    return this.fetchData;
  }

  getScope() {
    return this.scope;
  }

  getElementLabel(fieldName: string) {
    return this.name + '.properties.' + fieldName;
  }

  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(LISTFIELD_PREFIX, this.model, field);
  }

  public getBuildField(field: string): ListOptions {
    return Reflect.getMetadata(BUILDERFIELD_PREFIX, this.model, field);
  }
}
