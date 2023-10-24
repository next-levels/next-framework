import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, merge, Observable, Subject, takeUntil, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ListController } from '../../controllers/ListController';
import {
  BaseFacadeType,
  StoreFacade,
} from '../../../../../generic-store/public_api';
import {
  FilterOptions,
  LISTFIELD_ALL_PREFIX,
  LISTFIELD_PREFIX,
  ListOptions,
  PaginationMeta,
  ScopeFilter,
} from '@next-levels/types';

@Component({
  selector: 'table-submodule',
  templateUrl: './table-submodule.component.html',
})
export class TableSubmoduleComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Input() listController: ListController;
  @Input() showHeader = true;
  @Input() facade: StoreFacade;
  @Input() modelDefinition: any;
  @Input() scope: ScopeFilter;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading$: Observable<boolean>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public searchInputControl: FormControl = new FormControl<string | null>(null);
  public displayedColumns: string[] = [];
  public fields: string[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  modelFacade: BaseFacadeType;
  model: any;

  public pagination: PaginationMeta = {
    currentPage: 1,
    itemsPerPage: 5,
    totalPages: 0,
    totalItems: 0,
    sortBy: [['id', 'ASC' as SortDirection]],
  };

  public filterOptions: FilterOptions = {
    page: this.pagination.currentPage,
    limit: this.pagination.itemsPerPage,
    sortBy: `${
      this.pagination.sortBy[0][0]
    }:${this.pagination.sortBy[0][1].toUpperCase()}`,
    search: '',
  };

  constructor(
    public translateService: TranslateService,
    private store: Store<any>,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.queryParams.subscribe((params) => {
      if (params['search']) {
        this.filterOptions.search = params['search'];
      }
    });

    this.modelFacade = this.listController.getFacade();

    this.model = this.listController.getModelDefinition();

    this.fields = Reflect.getMetadata(
      LISTFIELD_ALL_PREFIX,
      this.listController.getModelDefinition()
    );
    if (this.fields) {
      this.displayedColumns = [...this.fields];
      this.displayedColumns.push('actions');
    }

    if (this.listController.scope.length > 0) {
      this.listController.scope.forEach((scope) => {
        this.filterOptions['filter.' + scope.key] =
          scope.operation + ':' + scope.value;
      });
    }

    this.modelFacade?.base.filtered$.subscribe((dataList: unknown[]) => {
      this.dataSource.data = dataList;
    });

    this.modelFacade?.base.pagination$.subscribe((paginationMeta) => {
      if (paginationMeta) {
        this.pagination = paginationMeta;
      }
    });

    if (this.modelFacade) {
      this.modelFacade.base.loadFiltered(this.filterOptions);
      this.loading$ = this.modelFacade.base.loaded$;
    }

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        tap((search: string) => {
          this.filterOptions = { ...this.filterOptions, search };
          if (this.modelFacade) {
            this.modelFacade.base.loadFiltered(this.filterOptions);
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    if (this.sort && this.paginator) {
      this.sort.sortChange.subscribe(() => {
        this.paginator.pageIndex = 0;
      });

      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          takeUntil(this._unsubscribeAll),
          tap(() => {
            this.filterOptions = {
              ...this.filterOptions,
              page: this.paginator.pageIndex + 1,
              limit: this.paginator.pageSize,
              sortBy: `${
                this.sort.active
              }:${this.sort.direction.toUpperCase()}`,
            };
            if (this.modelFacade) {
              this.modelFacade.base.loadFiltered(this.filterOptions);
            }
          })
        )
        .subscribe();
    }
  }

  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(
      LISTFIELD_PREFIX,
      this.listController.getModelDefinition(),
      field
    );
  }

  public selectRow(row: any) {}

  public onDelete(data: any) {}

  public openAddModal() {}

  public trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
