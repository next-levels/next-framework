import { CustomListFilter, ScopeFilter, ScopeFilterTyped } from './ScopeFilter';
import { ActionType } from './ActionType';
import { Fields } from '@next-levels/types';

export class ListController<T> {
  protected $listFields: Fields<T> = [];
  protected $listActions: Array<ActionType>;
  protected $listScope: ScopeFilterTyped<T> | ScopeFilter = null;
  protected $listFilters: CustomListFilter<T>[] = [];
  protected $listType: string;
  protected $rowAction: ActionType;

  protected $searchFields: Fields<T> = [];

  protected $editable: Fields<T> = [];

  constructor(model?: T, generator?: any) {
    if (model && generator) {
      this.$listFields = generator.getFields(model);
      this.$searchFields = generator.getSearchFields(model);
    }
  }

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

  rowAction(): ActionType {
    return this.$rowAction;
  }

  editable(): Fields<T> {
    return this.$editable;
  }
}
