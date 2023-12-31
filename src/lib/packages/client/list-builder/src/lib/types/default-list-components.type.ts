import { ViewRelationComponent } from '../components/view-items/view-relation/view-relation.component';
import { ViewTextComponent } from '../components/view-items/view-text/view-text.component';
import { ViewCurrencyComponent } from '../components/view-items/view-currency/view-currency.component';
import { ViewDateComponent } from '../components/view-items/view-date/view-date.component';
import { ViewFileComponent } from '../components/view-items/view-file/view-file.component';
import { ViewDropdownComponent } from '../components/view-items/view-dropdown/view-dropdown.component';
import { ListComponents } from '@next-levels/types';

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
  CHECKBOX: ViewTextComponent,
  RELATION: ViewRelationComponent,
  FILE: ViewFileComponent,
  SIGN: ViewFileComponent,
};
