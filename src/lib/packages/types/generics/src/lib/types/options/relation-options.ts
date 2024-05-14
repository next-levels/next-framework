import {ScopeFilter} from '../ScopeFilter';

/**
 * @deprecated
 */
export interface ModelRelationOptions {
  modelName?: string;
  store?: string;
  action?: any;
  selector?: any;
  model?: any;

  scope?: ScopeFilter;
  fields: string[];
}

export interface RelationOptions {
  type?: 'one' | 'many';
  model?: any;
  key?: string;
  keySelf?: string;
  inverse?: string;
  view?: string;
  fields?: string[];
  cascade?: boolean;
  eager?: boolean;
  main?: boolean;
}
