export type ScopeFilterOperations =
  | '$eq'
  | '$not'
  | '$g'
  | '$lt'
  | 'in'
  | 'nin'
  | '$like'
  | '$null';

export interface ScopeFilter {
  key: string;
  operation: string;
  value?: any;
}

export interface ScopeFilterTyped<T> {
  key: keyof T;
  operation: ScopeFilterOperations;
  value?: any;
}

export interface CustomListFilter<T> {
  name: string;
  visibility: boolean;
  position: number;
  options: ScopeFilterTyped<T> | ScopeFilterTyped<T>[];
}
