import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SwalService } from '../../services/swal/swal.service';
import { io } from 'socket.io-client';
import 'reflect-metadata';
import { MinimizeService } from '../../services/minimize/minimize.service';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { MatDialog } from '@angular/material/dialog';
import { FormController } from '../../../../../form-builder/src';
import { BasicFacade, BatchFacade } from '../../../../../generic-store/src';
import {
  ScopeFilter,
  UTIL,
  VISIBILITY_PREFIX,
  VISIBILITY_PREFIX_ALL,
} from '../../../../../../shared/generics/src';

@Component({
  selector: 'vosdellen-batch-wizard',
  templateUrl: './batch-wizard.component.html',
})
export class BatchWizardComponent implements AfterViewInit, OnInit {
  private socket: any;

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
  @Input() modelFacade: BasicFacade<any>;
  @Input() scope: ScopeFilter;

  className = '';
  progressRef: NgProgressRef;

  constructor(
    private swalService: SwalService,
    private readonly _matDialog: MatDialog,
    public minimizeService: MinimizeService,
    private progress: NgProgress
  ) {
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
        this.state,
        this.model
      );
    }
    this.className = this.formController.getClassName() ?? '';
    this.getSteps(Reflect.getMetadata(VISIBILITY_PREFIX_ALL, this.model));
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

  nextStep() {
    if (this.currentStep !== this.steps.length) this.currentStep++;
    this.formStepValid = false;
  }

  prevStep() {
    if (this.currentStep !== 0) this.currentStep--;
  }

  fireAction() {
    const form = this.formController.getForm().value;
    if (this.scope) {
      form[this.scope.key] = this.scope.value;
    }

    if ('batchEdit' in this.modelFacade) {
      const cleanForm = UTIL.removeNullProperties(form);
      let ids = this.values.map((obj: { id: any }) => obj.id);
      this.progressRef.start();

      (this.modelFacade as unknown as BatchFacade<any>).batchEdit(
        ids,
        cleanForm
      );
    } else {
      console.log('modelFacade does not have method "batchEdit"');
    }
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
