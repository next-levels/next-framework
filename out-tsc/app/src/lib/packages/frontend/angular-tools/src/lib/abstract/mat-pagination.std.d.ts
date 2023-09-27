import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FilterOptions, PaginationMeta } from '@nxtlvls/generic-types';
export declare class MatPaginationStd<T> {
    paginator: MatPaginator;
    sort: MatSort;
    dataSource: MatTableDataSource<T>;
    pagination: PaginationMeta;
    filterOptions: FilterOptions;
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any;
}
