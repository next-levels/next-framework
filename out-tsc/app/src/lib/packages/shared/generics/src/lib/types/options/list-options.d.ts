import { ListComponentsKeys } from '../components/list-components.type';
export interface ListOptions {
    label?: string;
    name?: string;
    type: ListComponentsKeys;
    options?: any;
}
