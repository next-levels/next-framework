import { ValidationType } from '../ValidationType';
import { FormComponentKeys } from '../components/form-components.type';

export interface FormOptions {
  label?: string;
  name?: string;
  type: FormComponentKeys;
  validation?: ValidationType;
  required?: boolean;
  hidden?: boolean;
  options?: any;
  disabled?: boolean;
  noLabel?: boolean;
  updateOn?: 'change' | 'blur' | 'submit';
}
