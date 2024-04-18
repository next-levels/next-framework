import { BaseComponents } from './components/base-components.type';

export type ScopeFilterOperations =
  '$eq' | '$not' | '$g' | '$lt' | 'in' | 'nin' | '$ilike';

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


