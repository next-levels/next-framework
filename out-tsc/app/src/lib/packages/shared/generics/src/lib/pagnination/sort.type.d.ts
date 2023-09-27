export type SortColumn<T> = keyof T | '';
export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent<T> {
    column: SortColumn<T>;
    direction: SortDirection;
}
