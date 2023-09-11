import { Component, OnInit } from '@angular/core';
import { BaseInputRelationDropdownComponent } from '@nxtlvls/form-builder';
@Component({
  selector: 'nxt-input-relation-dropdown',
  templateUrl: './input-relation-dropdown.component.html',
})
export class InputRelationDropdownComponent
  extends BaseInputRelationDropdownComponent
  implements OnInit {}
