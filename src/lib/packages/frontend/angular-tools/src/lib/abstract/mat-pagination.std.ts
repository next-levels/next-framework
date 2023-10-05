import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  FilterOptions,
  PaginationMeta,
  SortDirection,
} from 'src/lib/packages/shared/generics/src/index';

@Component({ templateUrl: 'mat-pagination.std.html' })
export class MatPaginationStd<T> {
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;
  public dataSource: MatTableDataSource<T> = new MatTableDataSource<T>([]);
  public pagination: PaginationMeta = {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 0,
    totalItems: 0,
    sortBy: [['id', 'DESC' as SortDirection]],
  };
  public filterOptions: FilterOptions = {
    page: this.pagination.currentPage,
    limit: this.pagination.itemsPerPage,
    sortBy: `${
      this.pagination.sortBy[0][0]
    }:${this.pagination.sortBy[0][1].toUpperCase()}`,
    search: '',
  };

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  public trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
