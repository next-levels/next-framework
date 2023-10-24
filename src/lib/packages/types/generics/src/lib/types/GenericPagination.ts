export interface EntityPaginated<EntityType> {
  data: EntityType[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface PaginationMeta {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string[]];
}

export interface PaginationLinks {
  current: string;
  next: string;
  last: string;
}
