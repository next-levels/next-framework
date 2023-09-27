import { EventEmitter } from '@angular/core';
import { SortColumn, SortDirection, SortEvent } from '@nxtlvls/generic-types';
export declare const rotate: {
    [key: string]: SortDirection;
};
export declare class NgbdSortableHeader<T> {
    sortable: SortColumn<T>;
    direction: SortDirection;
    sort: EventEmitter<SortEvent<T>>;
    rotate(): void;
}
