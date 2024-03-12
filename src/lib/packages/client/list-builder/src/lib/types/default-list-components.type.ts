import { ViewRelationComponent } from '../components/view-items/view-relation/view-relation.component';
import { ViewTextComponent } from '../components/view-items/view-text/view-text.component';
import { ViewCurrencyComponent } from '../components/view-items/view-currency/view-currency.component';
import { ViewDateComponent } from '../components/view-items/view-date/view-date.component';
import { ViewImageFileComponent } from '../components/view-items/view-imagefile/view-imagefile.component';
import { ViewDropdownComponent } from '../components/view-items/view-dropdown/view-dropdown.component';
import { ListComponents } from '@next-levels/types';
import { ViewCheckboxComponent } from '../components/view-items/view-checkbox/view-checkbox.component';
import { ViewFileComponent } from '../components/view-items/view-file/view-file.component';
import {ViewResultComponent} from "../components/view-items/view-result.component";

export let defaultListComponents: ListComponents = {
  HIDDEN: ViewTextComponent,
  TEXT: ViewTextComponent,
  CURRENCY: ViewCurrencyComponent,
  TEXTAREA: ViewTextComponent,
  DROPDOWN: ViewDropdownComponent,
  RADIO: ViewDropdownComponent,
  HTML: ViewTextComponent,
  DATE: ViewDateComponent,
  NUMBER: ViewTextComponent,
  CHECKBOX: ViewCheckboxComponent,
  RELATION: ViewRelationComponent,
  IMAGEFILE: ViewImageFileComponent,
  FILE: ViewFileComponent,
  SIGN: ViewImageFileComponent,
  JSON: ViewTextComponent,
  CODE: ViewTextComponent,
  RESULT: ViewResultComponent,
};
