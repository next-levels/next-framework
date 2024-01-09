import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { InstanceRegistryService } from '../../../../../angular-commons';
import { BaseInputComponent } from './base-input.component';
import {
  FilterOptions,
  ModelRelationOptions,
  PaginationMeta,
} from '@next-levels/types';
import { SortDirection } from '@angular/material/sort';

@Component({
  selector: 'nxt-input-relation-dropdown',
  template: '<ng-container ></ng-container>',
})
export class BaseInputRelationDropdownComponent
  extends BaseInputComponent
  implements OnInit
{
  data: any[] = [];

  protected _value: string;
  settings: ModelRelationOptions;

  options: any[] = [];
  selected: string | number;

  facade: any;

  public pagination: PaginationMeta = {
    currentPage: 1,
    itemsPerPage: 20,
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

  constructor(
    public store: Store<any>,
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    private registry: InstanceRegistryService
  ) {
    super(cdRef, translateService);
  }

  override init(): void {
    if (this.formField.name) {
      const model = this.formController?.getModelDefinition();
      this.options = model?.getFieldValues(this.formField?.name);
    }
  }

  logChange(event: any) {
    this.fg.patchValue({ [this.formField.name]: event?.value });
    this.dataOutput.emit(event?.value);
  }

  override ngOnInit(): void {
    this.settings = this.formController
      .getModelDefinition()
      .relations(this.formField.name);
    this.fg = this.formController?.getForm();
    this.formField.label = this.formField.label ?? this.formField.name;
    this.value = this.formController?.getValue(this.formField.name);
    this.dependency = this.formController?.getDependency(this.formField.name);
    this.visibilityOptions = this.formController?.getVisibility(
      this.formField.name
    );

    if (this.formField) {
      this.translateService
        .get(this.formController.getElementLabel(this.formField.name))
        .subscribe((translated: string) => {
          this.formField.label = translated ?? this.formField.name;
          // if (this.formField?.required) {
          //     this.formField.label = this.formField.label + '*';
          // }
        });
    }

    this._value = '';
    this.formControl = new FormControl(this.value, [Validators.required]);
    if (this.formController && this.formField.name) {
      this.formController.addFormControl(this.formControl, this.formField.name);
    }

    if (
      this.settings.action !== undefined &&
      this.settings.selector !== undefined
    ) {
      this.store.dispatch(this.settings.action);

      this.store.pipe(select(this.settings.selector)).subscribe((data) => {
        this.data = data;
        if (!this.initFilter()) this.mapData(data);
      });
    } else {
      const model = this.settings.model;
      if (this.registry.retrieve(model)) {
        this.facade = this.registry.retrieve(model);

        if (this.settings.scope) {
          this.filterOptions['filter.' + this.settings.scope.key] =
            this.settings.scope.operation + ':' + this.settings.scope.value;
          this.facade.base.loadFiltered(this.filterOptions);
        } else {
          this.facade.base.loadFiltered();
        }

        this.facade.base.filtered$.subscribe((data) => {
          this.data = data;
          if (!this.initFilter()) this.mapData(data);
        });
      }
    }
    this.fg = this.formController.getForm();
    this.initDependency();
  }

  private initFilter() {
    if (
      this.dependency?.field &&
      this.fg?.controls[this.dependency.field] &&
      this.dependency?.value === undefined
    ) {
      this.fg.controls[this.dependency.field].valueChanges.subscribe(
        (value: any) => {
          this.mapData(
            this.filterArrayByProperty(this.data, this.dependency?.field, value)
          );
        }
      );
      this.mapData(
        this.filterArrayByProperty(
          this.data,
          this.dependency?.field,
          this.fg?.controls[this.dependency.field].value
        )
      );
      return true;
    } else {
      return false;
    }
  }

  private filterArrayByProperty<T>(
    array: T[],
    propName: keyof T,
    value: T[keyof T]
  ): T[] {
    return array.filter((item) => item[propName] === value);
  }

  mapData(data: any) {
    this.options = data.map((selectedFieldArray) => {
      const fieldValues = [];

      this.settings.fields.forEach((field) => {
        let value = selectedFieldArray;
        field.split('.').forEach((key) => {
          value = value ? value[key] : null;
        });
        if (value !== null) fieldValues.push(value);
      });

      return {
        value: selectedFieldArray['id'],
        label: fieldValues.join(' | '),
      };
    });

    if (this.formField.name) {
      const value = this.formController.getValue(this.formField.name);
      const index = this.options.findIndex((a) => a.value == value);
      if (index > -1) {
        this.selected = this.options[index].value;
      }
      this.cdRef.markForCheck();
    }
  }
}
