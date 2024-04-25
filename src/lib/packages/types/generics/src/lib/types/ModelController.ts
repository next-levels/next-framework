import { DropdownOptions } from "./options/dropdown-options";
import { ModelRelationOptions } from "./options/relation-options";
import { ScopeFilter, ScopeFilterTyped } from './ScopeFilter';

export type Fields<T> = Array<keyof T>;
export type Groups<T> = Array<{ [key: string]: Fields<T> }>;
export type Tabs<T> = Array<{ [P in keyof T]?: Fields<T> }>;

export class ModelController<T> {

  $createFields: Fields<T> | Groups<T> | Tabs<T> = [];
  $detailFields: Fields<T> | Groups<T> | Tabs<T> = [];
  $detailActions: Fields<T>;

  $listFields: Fields<T> = [];
  $listScope: ScopeFilterTyped<T> = null;
  $listFilters: ScopeFilterTyped<T>[] = []
  $listType: string;

  createFields(): Fields<T> | Groups<T> | Tabs<T> {
    return this.$createFields;
  }

  detailFields(): Fields<T> | Groups<T> | Tabs<T> {
    return this.$detailFields;
  }

  detailActions(): Fields<T> {
    return this.$detailActions;
  }

  listFields(): Fields<T> {
    return this.$listFields;
  }

  listScope(): ScopeFilterTyped<T> {
    return this.$listScope;
  }

  dropdowns(field: string): DropdownOptions[] {
    switch (field) {
      default:
        return [];
    }
  }

  relations(field: string): ModelRelationOptions {
    switch (field) {
      default:
        return { store: '', fields: [] };
    }
  }


  constructor() {

  }


}





/*
export interface FormController<T> {

  dropdowns(field: string): DropdownOptions[] ;
  relations(field: string): ModelRelationOptions;

  createFields(): Array<{[key: string]: Array<keyof T>}>;
  detailFields?(): Array<{[key: string]: Array<keyof T>}>;
}


export class ListController<T> {

  createFields: Fields<T> | Groups<T> | Tabs<T> = [];
  detailFields: Fields<T> | Groups<T> | Tabs<T> = [];
}

*/
