import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from './base-input.component';
import { META } from '@next-levels/types';

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

      if (
        this.formField &&
        this.formField.options &&
        this.formField.options.options
      ) {
        this.options = this.formField.options.options.map((option: any) => {
          return {
            label: option,
            value: option,
          };
        });
      }
    }
  }

  logChange(event: any) {
    this.dataOutput.emit(event?.value);
  }
}
