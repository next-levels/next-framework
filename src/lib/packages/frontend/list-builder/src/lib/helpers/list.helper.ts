import { FilterOptions, PaginationMeta } from '@nxtlvls/generic-types';

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
