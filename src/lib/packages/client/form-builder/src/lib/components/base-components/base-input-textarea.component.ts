import { Component } from '@angular/core';
import { BaseInputComponent } from './base-input.component';

@Component({
  selector: 'nxt-input-textarea',
  template: '<ng-container ></ng-container>',
})
export class BaseInputTextareaComponent extends BaseInputComponent {
  onEventChange(event: any) {
    if (event.value) {
      this.dataOutput.emit(event.value.toISOString());
    }
  }
}
