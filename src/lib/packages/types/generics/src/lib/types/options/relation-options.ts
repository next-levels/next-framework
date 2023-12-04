import {ScopeFilter} from "../ScopeFilter";

export interface ModelRelationOptions {
  modelName?: string;
  store?: string;
  action?: any;
  selector?: any;
  model?: any;

  scope?: ScopeFilter;
  fields: string[];
}
