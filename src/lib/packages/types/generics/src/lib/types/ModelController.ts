import {DropdownOptions} from './options/dropdown-options';
import {ModelRelationOptions} from './options/relation-options';
import {ScopeFilterTyped} from './ScopeFilter';
import {ActionType} from './ActionType';
import {Fields, Groups, Tabs} from './Fields';

/**
 * @deprecated
 */
export class ModelController<T> {
  $createFields: Fields<T> | Groups<T> | Tabs<T> = [];
  $detailFields: Fields<T> | Groups<T> | Tabs<T> = [];
  $detailActions: Array<ActionType>;
  $listActions: Array<ActionType>;

  $headFields: Fields<T> = [];

  $listFields: Fields<T> = [];
  $listScope: ScopeFilterTyped<T> = null;
  $listFilters: ScopeFilterTyped<T>[] = [];
  $listType: string;

  createFields(): Fields<T> | Groups<T> | Tabs<T> {
    return this.$createFields;
  }

  headFields(): Fields<T> {
    return this.$headFields;
  }

  detailFields(): Fields<T> | Groups<T> | Tabs<T> {
    return this.$detailFields;
  }

  detailActions(): Array<ActionType> {
    return this.$detailActions;
  }

  listActions(): Array<ActionType> {
    return this.$listActions;
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

  constructor() {}
}
