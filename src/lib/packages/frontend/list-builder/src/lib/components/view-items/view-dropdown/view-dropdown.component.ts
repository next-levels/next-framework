import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'view-dropdown-text',
  templateUrl: './view-dropdown.component.html',
})
export class ViewDropdownComponent extends BaseViewComponent implements OnInit {
  override ngOnInit() {
    this._value = this.viewObject[this.fieldName];
    let mapValues = this.listController
      .getModelDefinition()
      .dropdowns(this.fieldName);
    this._value = mapValues.find((obj) => obj.value === this._value)?.label;
  }
}
