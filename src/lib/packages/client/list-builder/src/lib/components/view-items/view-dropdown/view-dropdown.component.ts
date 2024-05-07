import { Component, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';
import { META } from '@next-levels/types';
import { FORM } from '@next-levels/next-framework-client';

@Component({
  selector: 'view-dropdown-text',
  templateUrl: './view-dropdown.component.html',
})
export class ViewDropdownComponent extends BaseViewComponent implements OnInit {
  override ngOnInit() {
    this._value = this.viewObject[this.fieldName];

    const formController =
      META.getFormControllerByName(this.listController.getClassName()) ??
      this.listController.getModel();

    if (formController && FORM.hasDropdowns(formController)) {
      let mapValues = formController.dropdowns(this.fieldName);
      this._value = mapValues.find((obj) => obj.value === this._value)?.label;
    }
  }
}
