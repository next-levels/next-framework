import { Component } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'next-view-checkbox',
  template: `
    @if (this._value) {
    <mat-icon
      class="text-green-400 green-400"
      [svgIcon]="'heroicons_outline:check'"
    ></mat-icon>
    } @else {
    <mat-icon
      class="text-gray-400 gray-400"
      [svgIcon]="'heroicons_outline:x-mark'"
    ></mat-icon>
    }
  `,
})
export class ViewCheckboxComponent extends BaseViewComponent {
  // override ngOnInit() {
  //   super.ngOnInit();
  //   this._value = this._value ? 'Ja' : 'Nein';
  // }
}
