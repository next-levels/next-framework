import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import { SwalService } from '../../services/swal/swal.service';
import { io } from 'socket.io-client';
import 'reflect-metadata';
import { MinimizeService } from '../../services/minimize/minimize.service';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormController } from '../../../../../form-builder/src';
import { BasicFacade, BatchFacade } from '../../../../../generic-store/src';
import {
  BUILDERFIELD_ALL_PREFIX,
  LISTFIELD_ALL_PREFIX,
  ScopeFilter,
  UTIL,
  VISIBILITY_PREFIX,
  VISIBILITY_PREFIX_ALL,
} from '@next-levels/types';

@Component({
  selector: 'vosdellen-batch-wizard',
  templateUrl: './batch-wizard.component.html',
})
export class BatchWizardComponent implements AfterViewInit, OnInit {
  private socket: any;

  public formStepValid = true;

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
  @Input() config: any[];

  className = '';
  progressRef: NgProgressRef;

  constructor(
    private swalService: SwalService,
    private readonly _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      model: any;
      modelFacade: any;
      scope: ScopeFilter[];
      formController: FormController;
      edit: boolean;
      values: any;
      config: any[];
    },
    public minimizeService: MinimizeService,
    private progress: NgProgress,
    private cdRef: ChangeDetectorRef
  ) {
    this.model = data.model;
    this.modelFacade = data.modelFacade;
    this.scope = data.scope;
    this.edit = data.edit;
    this.values = data.values;
    this.formController = data.formController;
    this.config = data.config;

    this.progressRef = progress.ref('progress-header');
  }

  ngOnInit() {
    this.socket = io('/batch');
    this.socket.on('batch', (progressCount: any) => {
      if (progressCount === 100) {
        this.progressRef.complete();
        this._matDialog.closeAll();
      }
      this.progressRef.set(progressCount);
    });
  }

  ngAfterViewInit() {
    if (!this.formController) {
      this.formController = new FormController(
        this.values ?? this.model,
        this.modelFacade,
        this.model
      );
    }

    this.className = this.formController.getClassName() ?? '';

    const fileFields = Reflect.getMetadata(VISIBILITY_PREFIX_ALL, this.model);
    if (fileFields) {
      this.getSteps(fileFields);
    } else {
      const listFields =
        Reflect.getMetadata(
          LISTFIELD_ALL_PREFIX,
          this.formController.getModelDefinition()
        ) || [];

      const builderFields =
        Reflect.getMetadata(
          BUILDERFIELD_ALL_PREFIX,
          this.formController.getModelDefinition()
        ) || [];

      let fields = [...builderFields, ...listFields];

      if (this.config && this.config.length > 0) {
        fields = this.config
          .filter((item: any) => item.create === true)
          .map((item: any) => item.field);
      }

      this.getStepsConfig(fields);
    }
    this.cdRef.detectChanges();
  }

  getSteps(fileFields: never[]) {
    let currentStep = {
      index: 1,
      arrayIndex: this.steps.length + 1,
      title: 'General',
      description: '',
      fields: [],
    };
    for (let i = 0; i < fileFields.length; i++) {
      const field = Reflect.getMetadata(
        VISIBILITY_PREFIX,
        this.model,
        fileFields[i]
      );

      currentStep.fields.push(fileFields[i]);
    }
    this.steps.push(currentStep);
  }

  getStepsConfig(fileFields: any[]) {
    for (let i = 0; i < fileFields.length; i++) {
      const field = fileFields[i];
      let currentStep = this.steps.find((step) => step.title === field.group);

      if (!currentStep) {
        currentStep = {
          index: field.index,
          arrayIndex: this.steps.length + 1,
          title: field.group,
          description: '',
          fields: [],
        };
        this.steps.push(currentStep);
      }

      currentStep.fields.push(fileFields[i]);
    }
  }

  nextStep() {
    if (this.currentStep !== this.steps.length) this.currentStep++;
    //this.formStepValid = false;
  }

  prevStep() {
    if (this.currentStep !== 0) this.currentStep--;
  }

  fireAction() {
    const form = this.formController.getForm().value;
    if (this.scope && this.scope.length > 0) {
      form[this.scope[0].key] = this.scope[0].value;
    }
    // if ('batchEdit' in this.modelFacade) {
    const cleanForm = UTIL.removeNullProperties(form);
    let ids = this.values.map((obj: { id: any }) => obj.id);
    this.progressRef.start();

    this.modelFacade.base.batchEdit(ids, cleanForm);
    this._matDialog.closeAll();
    // } else {
    //   console.log('modelFacade does not have method "batchEdit"');
    // }
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
