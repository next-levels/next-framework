import { Component } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'next-view-checkbox',
  template: `
    @if (this._value) { A {{ this._value }} } @else { B {{ this._value }}
    }
  `,
})
export class ViewInlineEditComponent extends BaseViewComponent {
  // override ngOnInit() {
  //   super.ngOnInit();
  //   this._value = this._value ? 'Ja' : 'Nein';
  // }
}
