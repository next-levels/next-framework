import { Component } from '@angular/core';

import { BaseTableDefaultComponent } from '../base-table-default/base-table-default.component';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'nxtlvls-table-calendar',
  templateUrl: './table-calendar.component.html',
  styleUrls: ['../base-table-default/base-table.scss'],
})
export class TableCalendarComponent extends BaseTableDefaultComponent {
  selectedDate: Date;
  calendarEvents: { date: Date; class: string }[] = [];

  override ngOnInit() {
    super.ngOnInit();
    this.calendarEvents = this.dataSource.data.map((item) => ({
      date: new Date(item.date),
      class: 'event-class',
    }));
  }

  dateSelected(date: Date) {
    this.selectedDate = date;
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const event = this.calendarEvents.find(
      (item) => item.date.getTime() === date.getTime()
    );
    return event ? event.class : '';
  };
}
