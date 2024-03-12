import {DropdownOptions} from "./options/dropdown-options";
import {ModelRelationOptions} from "./options/relation-options";

export interface FormController<T> {

  dropdowns(field: string): DropdownOptions[] ;
  relations(field: string): ModelRelationOptions;

  createFields(): Array<{[key: string]: Array<keyof T>}>;
  detailFields?(): Array<{[key: string]: Array<keyof T>}>;
}
