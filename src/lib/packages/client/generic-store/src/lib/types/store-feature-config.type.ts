import { SelectorType } from '../factory/generic.factory';

export interface StoreFeatureConfig<T extends object, S extends object> {
  name: string;
  route?: string;
  label?: string;
  features?: string[];
  selectors?: Array<SelectorType<T, S>>;
}
