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
  return "listFields" in obj;
}

export function hasListActions(obj: any): boolean {
  return "listActions" in obj;
}
