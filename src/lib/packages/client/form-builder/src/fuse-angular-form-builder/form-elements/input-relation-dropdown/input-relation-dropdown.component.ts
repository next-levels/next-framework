import { Component, OnInit } from '@angular/core';
import { BaseInputRelationDropdownComponent } from '@next-levels/next-framework-client';

@Component({
  selector: 'nxt-input-relation-dropdown',
  templateUrl: './input-relation-dropdown.component.html',
})
export class InputRelationDropdownComponent
  extends BaseInputRelationDropdownComponent
  implements OnInit {}
