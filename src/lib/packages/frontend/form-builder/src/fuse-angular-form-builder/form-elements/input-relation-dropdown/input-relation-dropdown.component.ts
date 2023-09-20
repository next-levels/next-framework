import { Component, OnInit } from '@angular/core';
import { BaseInputRelationDropdownComponent } from '../../../../public_api';

@Component({
  selector: 'nxt-input-relation-dropdown',
  templateUrl: './input-relation-dropdown.component.html',
})
export class InputRelationDropdownComponent
  extends BaseInputRelationDropdownComponent
  implements OnInit {}
