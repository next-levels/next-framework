import { Component, Input } from '@angular/core';

import { BaseTableDefaultComponent } from '../base-table-default/base-table-default.component';
import { FormController } from '../../../../../form-builder';

@Component({
  selector: 'nxtlvls-table-inline-edit',
  templateUrl: './table-inline-edit.component.html',
  styleUrls: ['../base-table-default/base-table.scss'],
})
export class TableInlineEditComponent extends BaseTableDefaultComponent {
  @Input() editFields: string[] = [];
}
