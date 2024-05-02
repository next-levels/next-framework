import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { getFilterOptions } from '../../helpers/list.helper';
import { ListController } from '../../controllers/ListController';
import {
  FilterOptions,
  LISTFIELD_ALL_PREFIX,
  LISTFIELD_PREFIX,
  ListOptions,
  PaginationMeta,
  SortDirection,
} from '@next-levels/types';
import { CreateWizardComponent } from '../../../../../dynamic-modals';

@Component({
  template: '<ng-container></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() listController: ListController;

  @Output() rowClick = new EventEmitter<any>();
  @Output() rowDelete = new EventEmitter<any>();
  @Output() rowExport = new EventEmitter<any>();
  @Output() rowCreate = new EventEmitter<any>();

  modelFacade: any;
  model: any;
  data: any[] = [];

  public displayedColumns: string[] = [];
  public fields: string[] = [];

  public pagination: PaginationMeta = {
    currentPage: 1,
    itemsPerPage: 20,
    totalPages: 0,
    totalItems: 0,
    sortBy: [['id', 'DESC' as SortDirection]],
  };

  public filterOptions: FilterOptions;
  public selection = new SelectionModel<Element>(true, []);

  public loading$: Observable<boolean>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public translateService: TranslateService,
    public router: ActivatedRoute,
    public _matDialog: MatDialog,
    public cdRef: ChangeDetectorRef
  ) {
    this.filterOptions = getFilterOptions(this.pagination);
  }

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
      this.displayedColumns.push('select');
      this.displayedColumns = [...this.displayedColumns, ...this.fields];
      this.displayedColumns.push('actions');
    }

    if (this.listController.scope.length > 0) {
      this.listController.scope.forEach((scope) => {
        if(scope.value){
          this.filterOptions['filter.' + scope.key] =
              scope.operation + ':' + scope.value;
        }else {
          this.filterOptions['filter.' + scope.key] =
              scope.operation ;
        }

      });
    }

    this.modelFacade?.base.filtered$.subscribe((insurers: unknown) => {
      this.data = insurers as unknown[];
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
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(
      LISTFIELD_PREFIX,
      this.listController.getModelDefinition(),
      field
    );
  }
  public selectRow(row: any) {
    this.rowClick.emit(row);
  }
  public onDelete(data: any) {
    this.rowDelete.emit(data);
  }
  public onCreate() {
    this.rowCreate.emit();
  }
  public openExport() {
    this.rowExport.emit();
  }
  public openAddModal() {
    this._matDialog.open(CreateWizardComponent, {
      minWidth: '50%',
      autoFocus: false,
      data: {
        model: this.model,
        modelFacade: this.modelFacade,
        scope: this.listController.scope,
      },
    });
    this.cdRef.detectChanges();
  }

  public trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
