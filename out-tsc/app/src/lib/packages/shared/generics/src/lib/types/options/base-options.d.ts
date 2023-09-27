import { ValidationType } from '../ValidationType';
import { BuilderComponentsKeys } from '../components/base-components.type';
export interface BuilderOptions {
    label?: string;
    name?: string;
    type: BuilderComponentsKeys;
    validation?: ValidationType;
    required?: boolean;
    hidden?: boolean;
    options?: any;
}
