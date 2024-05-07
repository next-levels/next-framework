import { DropdownOptions } from './options/dropdown-options';
import { ModelRelationOptions } from './options/relation-options';
import { ActionType } from './ActionType';
import { Fields, Grids, Groups, Tabs } from '@next-levels/types';

export class FormController<T> {
  $createFields: Fields<T> | Groups<T> | Tabs<T> = [];
  $detailFields: Fields<T> | Groups<T> | Tabs<T> = [];
  $detailActions: Array<ActionType>;
  $headFields: Fields<T> | Grids<T> = [];

  constructor() {}

  createFields(): Fields<T> | Groups<T> | Tabs<T> {
    return this.$createFields;
  }

  headFields(): Fields<T> | Grids<T> {
    return this.$headFields;
  }

  detailFields(): Fields<T> | Groups<T> | Tabs<T> {
    return this.$detailFields;
  }

  detailActions(): Array<ActionType> {
    return this.$detailActions;
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
}
