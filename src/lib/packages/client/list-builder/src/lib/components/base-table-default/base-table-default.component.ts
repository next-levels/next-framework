import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  interval,
  merge,
  Observable,
  Subject,
  Subscription,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ViewModalComponent } from '../view-modal/view-modal.component';
import { ListController } from '../../controllers/ListController';
import { BaseFacadeType } from '../../../../../generic-store/src';
import {
  BUILDERFIELD_ALL_PREFIX,
  EXPORT_PREFIX,
  EXPORT_PREFIX_ALL,
  FilterOptions,
  LISTFIELD_ALL_PREFIX,
  META,
  PaginationMeta,
  ScopeFilter,
} from '@next-levels/types';
import {
  BatchWizardComponent,
  CreateWizardComponent,
} from '../../../../../dynamic-modals';
import { hasListActions, haslistFields } from '../../helpers/list.helper';
import { InstanceRegistryService } from '../../../../../angular-commons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  template: '<ng-container></ng-container>',
  styleUrls: ['./base-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableDefaultComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit
{
  @Input() listController: ListController;
  @Input() viewController: any;
  @Input() showHeader = false;
  @Input() showSearch = true;
  @Input() selector: string;
  @Input() detailModal = false;
  @Input() route = '';
  @Input() childTable = false;
  @Input() entities: any[] = [];
  @Input() searchQuery: any | null;
  @Output() rowClick = new EventEmitter<any>();
  @Output() rowDelete = new EventEmitter<any>();
  @Output() rowExport = new EventEmitter<any>();
  @Output() rowCreate = new EventEmitter<any>();
  @Output() getQueryRowsView = new EventEmitter<any>();
  @Output() saveSearchQuery = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public loading$: Observable<boolean>;
  @Output() fetchData = true;
  public _unsubscribeAll: Subject<any> = new Subject<any>();
  public searchInputControl: FormControl = new FormControl<string | null>(null);
  public statusFilterControl: FormControl = new FormControl<string>('');
  public displayedColumns: string[] = [];
  public fields: string[] = [];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  modelFacade: BaseFacadeType;
  model: any;
  actions: [] = [];
  modelReference: string;
  itemsPerPage = 20;

  instnace_id: string;

  public pagination: PaginationMeta = {
    currentPage: 1,
    itemsPerPage: this.itemsPerPage,
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
  public selection = new SelectionModel<Element>(true, []);
  private subscription: Subscription;

  constructor(
    public translateService: TranslateService,
    private activeRoute: ActivatedRoute,
    public router: Router,
    public readonly _matDialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    private registry: InstanceRegistryService
  ) {
    this.instnace_id = uuidv4();
  }

  ngOnInit() {
    this.dataSource.data = Array(20).fill({});

    if (this.entities && this.entities.length > 0) {
      this.fetchData = false;
    }

    this.activeRoute.queryParams.subscribe((params) => {
      this.filterOptions.search = params['search'] || this.filterOptions.search;
      this.filterOptions.page = params['page'] || this.filterOptions.page;
      this.filterOptions.limit = params['limit'] || this.filterOptions.limit;
      this.filterOptions.sortBy = params['sortBy'] || this.filterOptions.sortBy;
    });

    this.modelFacade = this.listController.getFacade();
    this.model = this.listController.getModelDefinition();
    this.modelReference = this.listController.getClassName();

    if (this.fetchData) {
      const instance = this.registry.retrieve(this.modelReference);
      if (instance && instance.notification) {
        instance.notification.updated$.subscribe((updated) => {});
        instance.notification.resetCount();

        this.registry.retrieve(this.modelReference).notification.resetCount();
      }
    }

    const listFields =
      Reflect.getMetadata(
        LISTFIELD_ALL_PREFIX,
        this.listController.getModelDefinition()
      ) || [];

    const builderFields =
      Reflect.getMetadata(
        BUILDERFIELD_ALL_PREFIX,
        this.listController.getModelDefinition()
      ) || [];

    this.fields = [...builderFields, ...listFields];

    if (this.viewController === undefined) {
      this.viewController = META.getListController(this.model) ?? this.model;
    }

    if (
      haslistFields(this.viewController) &&
      this.viewController.listFields().length > 0
    ) {
      this.fields = this.viewController
        .listFields()
        .filter((field) => this.fields.includes(field));
    }

    if (hasListActions(this.viewController)) {
      this.actions = this.viewController.listActions();
    }

    if (this.fields) {
      if (!this.childTable) {
        this.displayedColumns.push('select');
      }
      this.displayedColumns = [...this.displayedColumns, ...this.fields];
      this.displayedColumns.push('actions');
    }
    if (this.listController.scope.length > 0) {
      this.listController.scope.forEach((scope) => {
        if (scope.value) {
          this.filterOptions['filter.' + scope.key] =
            scope.operation + ':' + scope.value;
        } else {
          this.filterOptions['filter.' + scope.key] = scope.operation;
        }
      });
    }

    if (this.fetchData) {
      this.subscription = this.modelFacade?.base.filtered$.subscribe(
        (entries: unknown) => {
          this.dataSource.data = entries as any[];
          this.cdRef.detectChanges();
        }
      );

      this.modelFacade?.base.pagination$.subscribe((paginationMeta) => {
        if (paginationMeta) {
          this.pagination = {
            ...paginationMeta,
            currentPage: paginationMeta.currentPage,
            itemsPerPage: paginationMeta.itemsPerPage,
          };
          this.filterOptions = {
            ...this.filterOptions,
            page: paginationMeta.currentPage,
            limit: paginationMeta.itemsPerPage,
            sortBy: `${
              paginationMeta.sortBy[0][0]
            }:${paginationMeta.sortBy[0][1].toUpperCase()}`,
          };
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

    if (!this.fetchData) {
      if (this.viewController && this.entities && this.entities.length > 0) {
        const scope: ScopeFilter = this.viewController.listScope();
        this.entities = this.entities.filter((entity) => {
          let valid = true;

          if (scope.key && scope.key.includes('.')) {
            const keys = scope.key.split('.');
            valid = valid && entity[keys[0]][keys[1]] === scope.value;
          }
          if (scope.key && scope.value) {
            valid = valid && entity[scope.key] === scope.value;
          }

          return valid;
        });
      }
      this.dataSource.data = this.entities;
    }

    this.cdRef.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('listController' in changes) {
      this.filterOptions = {
        page: this.pagination.currentPage,
        limit: this.pagination.itemsPerPage,
        sortBy: `${
          this.pagination.sortBy[0][0]
        }:${this.pagination.sortBy[0][1].toUpperCase()}`,
        search: '',
      };
      if (this.listController.scope.length > 0) {
        this.listController.scope.forEach((scope) => {
          if (scope.value) {
            this.filterOptions['filter.' + scope.key] =
              scope.operation + ':' + scope.value;
          } else {
            this.filterOptions['filter.' + scope.key] = scope.operation;
          }
        });
      }
      if (this.fetchData && this.modelFacade) {
        this.modelFacade.base.loadFiltered(this.filterOptions);
        this.loading$ = this.modelFacade.base.loaded$;
      }
    }
  }

  ngAfterViewInit(): void {
    if (!this.fetchData) {
      return;
    }
    const checkInterval = interval(100).pipe(
      takeWhile(() => !this.sort || !this.paginator)
    );

    checkInterval.subscribe({
      next: () => {},
      complete: () => {
        this.initializeSortAndPaginator();
        this.cdRef.detectChanges();
      },
    });
  }

  getTimestamp(value) {
    return new Date(value).getTime();
  }

  public selectRow(row: any) {
    if (this.viewController.$rowAction) {
      this.viewController.$rowAction.click(row, this.router);
      return;
    }

    if (this.detailModal) {
      this._matDialog.open(CreateWizardComponent, {
        minWidth: '50%',
        autoFocus: false,
        data: {
          model: this.model,
          edit: true,
          values: row,
          modelFacade: this.modelFacade,
          scope: this.listController.scope,
        },
      });
      this.cdRef.detectChanges();
    } else {
      this.router.navigate([this.router.url + '/detail/' + row.id]);
    }
  }

  public delete(data: any) {
    let name = '';
    this.translateService.get('test').subscribe((translated: string) => {
      const labelCode =
        META.getNameByModel(this.listController.getModelDefinition()) + '.name';
      name = this.translateService.instant(labelCode);
    });

    Swal.fire({
      text: 'Sind Sie sich sicher, dass Sie den ' + name + ' löschen möchten?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Nein, abbrechen',
    }).then((result) => {
      if (result.value) {
        this.modelFacade.base.delete(data);
      } else if (result.isDismissed) {
      }
    });
  }

  public duplicate(data: any) {
    Swal.fire({
      text: 'Sind Sie sich sicher, dass Sie diesen Eintrag duplizieren möchten?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ja, duplizieren!',
      cancelButtonText: 'Nein, abbrechen',
    }).then((result) => {
      if (result.value) {
        const duplicate = JSON.parse(JSON.stringify(data));
        delete duplicate.id;
        if (duplicate.name) {
          duplicate.name += ' COPY';
        }
        this.modelFacade.base.add(duplicate);
      } else if (result.isDismissed) {
      }
    });
  }

  batchEdit() {
    this._matDialog.open(BatchWizardComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: {
        model: this.model,
        modelFacade: this.modelFacade,
        edit: true,
        scope: this.listController.scope,
        config: this.listController.getConfig(),
        values: this.selection.selected,
      },
    });
    this.cdRef.detectChanges();
  }

  batchDelete() {
    let name = '';
    this.translateService.get('test').subscribe((translated: string) => {
      const labelCode =
        META.getNameByModel(this.listController.getModelDefinition()) + '.name';
      name = this.translateService.instant(labelCode);
    });
    Swal.fire({
      text:
        'Sind Sie sich sicher, dass Sie die ausgewählten Einträge vom Typ ' +
        name +
        ' löschen möchten?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, löschen!',
      cancelButtonText: 'Nein, abbrechen',
    }).then((result) => {
      if (result.value) {
        this.modelFacade.base.batchDelete(this.selection.selected);
      } else if (result.isDismissed) {
      }
    });
  }

  public fireAction(action) {
    action.click(this.model);
  }

  public openAddModal() {
    this._matDialog.open(CreateWizardComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: {
        model: this.model,
        modelFacade: this.modelFacade,
        scope: this.listController.scope,
        config: this.listController.getConfig(),
      },
    });
    this.cdRef.detectChanges();
  }

  export() {
    const listFields =
      Reflect.getMetadata(
        LISTFIELD_ALL_PREFIX,
        this.listController.getModelDefinition()
      ) || [];

    const builderFields =
      Reflect.getMetadata(
        BUILDERFIELD_ALL_PREFIX,
        this.listController.getModelDefinition()
      ) || [];

    const exportFields =
      Reflect.getMetadata(
        EXPORT_PREFIX_ALL,
        this.listController.getModelDefinition()
      ) || [];

    let fields = [...builderFields, ...listFields, ...exportFields];

    fields = fields.map((field) => {
      let options =
        Reflect.getMetadata(
          EXPORT_PREFIX,
          this.listController.getModelDefinition(),
          field
        ) || {};
      return { field, options };
    });

    //filter out fields that have options.hidden set to true and return only the field names
    let headerFields = fields.filter((field) => {
      return field.options.hidden !== true;
    });

    let csvData = this.ConvertToCSV(this.dataSource.data, headerFields);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);

    let name = '';
    this.translateService.get('test').subscribe((translated: string) => {
      const labelCode =
        META.getNameByModel(this.listController.getModelDefinition()) + '.name';
      name = this.translateService.instant(labelCode);
    });

    dwldLink.setAttribute(
      'download',
      name + '_export_' + new Date().toDateString() + '.csv'
    );
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray: any, headerList: any[]) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'S.No,';

    for (let index in headerList) {
      let name = '';
      this.translateService.get('test').subscribe((translated: string) => {
        let field =
          headerList[index].options.selector ?? headerList[index].field;
        let labelCode = '';
        if (field.includes('.')) {
          labelCode =
            field.split('.')[0] + '.properties.' + field.split('.')[1];
        } else {
          labelCode =
            META.getNameByModel(this.listController.getModelDefinition()) +
            '.properties.' +
            field;
        }

        name = this.translateService.instant(labelCode);
      });
      row += name + ',';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = i + 1 + '';
      for (let index in headerList) {
        let head =
          headerList[index].options?.selector || headerList[index].field;
        let value = '';
        if (head.includes('.')) {
          let split = head.split('.');
          let orgValue = array[i];
          value = orgValue[split[0]][split[1]];
          line += ',' + value;
        } else {
          line += ',' + array[i][head];
        }
      }
      str += line + '\r\n';
    }
    return str;
  }

  public openViewModal(row: any) {
    if (this.detailModal) {
      this._matDialog.open(ViewModalComponent, {
        minWidth: '50%',
        autoFocus: false,
        data: {
          model: this.model,
          modelFacade: this.modelFacade,
          values: row,
        },
      });
      this.cdRef.detectChanges();
    } else {
      if (this.route !== '') {
        this.router.navigate([this.route + '/' + row.id]);
      }
    }
  }

  setQuery(filterOptions: any[]) {
    let value, arr;
    const filters: FilterOptions = { ...this.filterOptions };
    for (const filterOption of filterOptions) {
      value = filterOption.expression ? filterOption.expression + ':' : '';
      value += filterOption.operation + ':' + filterOption.value;
      if (filters['filter.' + filterOption.key]) {
        arr = [];
        arr.push(filters['filter.' + filterOption.key]);
        arr.push(value);
        filters['filter.' + filterOption.key] = arr;
      } else {
        filters['filter.' + filterOption.key] = value;
      }
    }

    this.modelFacade?.base.loadFiltered(filters);
  }

  public openQueryRowsModal() {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  isOneSelected() {
    const numSelected = this.selection.selected.length;
    return numSelected > 0;
  }

  public trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this._unsubscribeAll.complete();
  }

  private initializeSortAndPaginator() {
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
            sortBy: `${this.sort.active}:${this.sort.direction.toUpperCase()}`,
          };

          if (this.modelFacade) {
            this.modelFacade.base.loadFiltered(this.filterOptions);
          }
        })
      )
      .subscribe();
  }
}
