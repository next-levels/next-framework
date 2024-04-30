import { Component } from '@angular/core';
import { BaseViewComponent } from '../base-view/base-view.component';

@Component({
  selector: 'view-state',
  templateUrl: './view-state.component.html',
  styleUrls: ['./view-state.component.scss'],
})
export class ViewStateComponent extends BaseViewComponent {
  colors = [
    'bg-teal-400',
    'bg-indigo-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-green-400',
  ];

  getColor(value: string): string {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash % this.colors.length);
    return this.colors[colorIndex];
  }
}
