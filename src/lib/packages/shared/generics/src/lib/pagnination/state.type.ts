import { SortColumn, SortDirection } from './sort.type';

export interface State<T, F> {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn<T>;
  sortDirection: SortDirection;
  filter: F;
}
