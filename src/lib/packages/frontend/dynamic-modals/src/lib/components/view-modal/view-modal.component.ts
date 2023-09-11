import 'reflect-metadata';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SwalService } from '../../services/swal/swal.service';
import { MinimizeService } from '../../services/minimize/minimize.service';
import {
  BUILDERFIELD_PREFIX,
  LISTFIELD_PREFIX,
  ListOptions,
  ScopeFilter,
  VISIBILITY_PREFIX,
  VISIBILITY_PREFIX_ALL,
} from '@nxtlvls/generic-types';
import { FormController } from '@nxtlvls/form-builder';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ListController } from '@nxtlvls/list-builder';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'view-modal',
  templateUrl: './view-modal.component.html',
})
export class ViewModalComponent implements AfterViewInit, OnInit {
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

  listController: ListController;
  _fields: any[] = [];

  className = '';

  @ViewChild('horizontalStepper') stepperComponent: MatStepper;

  constructor(
    private swalService: SwalService,
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
    if (!this.listController) {
      this.listController = new ListController(
        this.values ?? this.model,
        this.modelFacade,
        this.model
      );
    }

    this.className = this.listController.getClassName() ?? '';
    this._fields = Reflect.getMetadata(VISIBILITY_PREFIX_ALL, this.model);

    this.cdRef.detectChanges();
  }

  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(BUILDERFIELD_PREFIX, this.model, field);
  }

  close() {
    this._matDialog.closeAll();
  }

  onDismiss() {
    this.swalService.fireValidation().then((result) => {
      if (result.isConfirmed) {
        this._matDialog.closeAll();

        this.minimizeService.minimizeCurrentModal(
          Object.assign(Object.create(Object.getPrototypeOf(this)), this)
        );

       } else if (result.isDenied) {
        this._matDialog.closeAll();
       } else if (result.isDismissed) {
       }
    });
  }
}
