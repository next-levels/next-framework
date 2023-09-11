import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from './base-input.component';

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
      this.options = model?.dropdowns(this.formField?.name);
    }
  }
  logChange(event: any) {
    this.dataOutput.emit(event?.value);
  }
}
