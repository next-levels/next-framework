import { ScopeFilterTyped } from './ScopeFilter';
import { ActionType } from './ActionType';
import { Fields } from '@next-levels/types';

export class ListController<T> {
  $listFields: Fields<T> = [];
  $listActions: Array<ActionType>;
  $listScope: ScopeFilterTyped<T> = null;
  $listFilters: ScopeFilterTyped<T>[] = [];
  $listType: string;

  $searchFields: Fields<T> = [];

  listActions(): Array<ActionType> {
    return this.$listActions;
  }

  listFields(): Fields<T> {
    return this.$listFields;
  }

  listScope(): ScopeFilterTyped<T> {
    return this.$listScope;
  }

  searchFields(): Fields<T> {
    return this.$searchFields;
  }

  listFilters(): ScopeFilterTyped<T>[] {
    return this.$listFilters;
  }

  listType(): string {
    return this.$listType;
  }

  constructor() {}
}
