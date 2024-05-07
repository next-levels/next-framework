import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from './base-input.component';
import { META } from '@next-levels/types';
import { FORM } from '../../helper/form.helper';

@Component({
  selector: 'nxt-input-dropdown',
  template: '<ng-container ></ng-container>',
})
export class BaseInputDropdownComponent
  extends BaseInputComponent
  implements OnInit
{
  options: any[] = [];

  override init(): void {
    if (this.formField.name) {
      const model = this.formController?.getModelDefinition();
      const viewModel = META.getFormController(model) ?? model;

      if (FORM.hasDropdowns(viewModel)) {
        this.options = viewModel?.dropdowns(this.formField?.name);
      }
    }
  }

  logChange(event: any) {
    this.dataOutput.emit(event?.value);
  }
}
