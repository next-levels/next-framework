import { CustomListFilter, ScopeFilter, ScopeFilterTyped } from './ScopeFilter';
import { ActionType } from './ActionType';
import { Fields } from '@next-levels/types';

export class ListController<T> {
  $listFields: Fields<T> = [];
  $listActions: Array<ActionType>;
  $listScope: ScopeFilterTyped<T> | ScopeFilter = null;
  $listFilters: CustomListFilter<T>[] = [];
  $listType: string;
  $rowAction: ActionType;

  $searchFields: Fields<T> = [];

  constructor() {}

  listActions(): Array<ActionType> {
    return this.$listActions;
  }

  listFields(): Fields<T> {
    return this.$listFields;
  }

  listScope(): ScopeFilterTyped<T> | ScopeFilter {
    return this.$listScope;
  }

  searchFields(): Fields<T> {
    return this.$searchFields;
  }

  listFilters(): CustomListFilter<T>[] {
    return this.$listFilters;
  }

  listType(): string {
    return this.$listType;
  }
}
