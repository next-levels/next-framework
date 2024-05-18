import 'reflect-metadata';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SwalService } from '../../services/swal/swal.service';
import { MinimizeService } from '../../services/minimize/minimize.service';

import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { TranslateService } from '@ngx-translate/core';
import { FormController } from '../../../../../form-builder';
import {
  BUILDERFIELD_PREFIX,
  ListOptions,
  ScopeFilter,
  VISIBILITY_PREFIX_ALL,
} from '@next-levels/types';
import { ListController } from '../../../../../list-builder';

@Component({
  selector: 'translate-modal',
  templateUrl: './translate-modal.component.html'
})
export class TranslateModalComponent implements AfterViewInit, OnInit {
  public formStepValid = false;

  public currentStep = 1;
  public steps: {
    index: number;
    arrayIndex: number;
    title: string;
    description: string;
    fields: any[];
  }[] = [];

  @Input() model: any;
  @Input() values: any;
  @Input() state: any;
  @Input() action: () => void;
  @Input() edit = false;
  @Input() formController: FormController;
  @Input() modelFacade: any;
  @Input() scope: ScopeFilter[];

  _fields: any[] = [];

  className = '';

  @ViewChild('horizontalStepper') stepperComponent: MatStepper;

  constructor(
    private readonly _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      model: any;
      modelFacade: any;
      formController: FormController;
      edit: boolean;
      values: any;
    },
    public minimizeService: MinimizeService,
    public translateService: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {
    this.model = data.model;
    this.modelFacade = data.modelFacade;
    this.edit = data.edit;
    this.values = data.values;
    this.formController = data.formController;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
  }

  close() {
    this._matDialog.closeAll();
  }

  dataOutput(value) {
    console.log(value);
  }

}
