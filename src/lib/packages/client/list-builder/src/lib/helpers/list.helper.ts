import { FilterOptions } from '@next-levels/types';

export function getFilterOptions(pagination): FilterOptions {
  return {
    page: pagination.currentPage,
    limit: pagination.itemsPerPage,
    sortBy: `${
      pagination.sortBy[0][0]
    }:${pagination.sortBy[0][1].toUpperCase()}`,
    search: '',
  };
}

export function haslistFields(obj: any): boolean {
  return 'listFields' in obj;
}

export function hasListActions(obj: any): boolean {
  return 'listActions' in obj;
}

export function hasListFields(obj: any): boolean {
  return 'listFields' in obj;
}

export function hasSearchFields(obj: any): boolean {
  return 'searchFields' in obj;
}

export function hasListFilters(obj: any): boolean {
  return 'listFilters' in obj;
}

export function haslistScope(obj: any): boolean {
  return 'listScope' in obj;
}

export function hasListType(obj: any): boolean {
  return 'listType' in obj;
}
