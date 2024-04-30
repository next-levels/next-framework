import { ScopeFilterTyped } from './ScopeFilter';
import { ActionType } from './ActionType';
import { Fields } from '@next-levels/types';

export class ListController<T> {
  $listFields: Fields<T> = [];
  $listActions: Array<ActionType>;
  $listScope: ScopeFilterTyped<T> = null;
  $listFilters: ScopeFilterTyped<T>[] = [];
  $listType: string;

  listActions(): Array<ActionType> {
    return this.$listActions;
  }

  listFields(): Fields<T> {
    return this.$listFields;
  }

  listScope(): ScopeFilterTyped<T> {
    return this.$listScope;
  }

  constructor() {}
}
