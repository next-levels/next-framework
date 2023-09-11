import { Component, Input } from '@angular/core';

@Component({
  selector: 'vosdellen-contract-state',
  templateUrl: './contract-state.component.html',
  styleUrls: ['./contract-state.component.scss'],
})
export class ContractStateComponent {
  @Input() value: string;
  constructor() {}
}
