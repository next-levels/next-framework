import { ValidationType } from '../ValidationType';
import { BuilderComponentsKeys } from '../components/base-components.type';

export interface BuilderOptions {
  label?: string;
  name?: string;
  type: BuilderComponentsKeys;
  validation?: ValidationType;
  listType?: string;
  prompt?: any;
  translatable?: boolean;
  size?: 'small' | 'half' | 'full';
  required?: boolean;
  hidden?: boolean;
  options?: any;
  readonly?: boolean;
  icon?: string;
  suffix?: string;
  hint?: string;
  max?: number;
}
