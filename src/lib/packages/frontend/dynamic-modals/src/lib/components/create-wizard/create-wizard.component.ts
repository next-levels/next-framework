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
  ScopeFilter,
  VISIBILITY_PREFIX,
  VISIBILITY_PREFIX_ALL,
} from '@nxtlvls/generic-types';
import { FormController } from '@nxtlvls/form-builder';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'vosdellen-create-wizard',
  templateUrl: './create-wizard.component.html',
})
export class CreateWizardComponent implements AfterViewInit, OnInit {
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

  className = '';

  @ViewChild('horizontalStepper') stepperComponent: MatStepper;

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
    },
    public minimizeService: MinimizeService,
    private cdRef: ChangeDetectorRef
  ) {
    this.model = data.model;
    this.modelFacade = data.modelFacade;
    this.scope = data.scope;
    this.edit = data.edit;
    this.values = data.values;
    this.formController = data.formController;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    if (!this.formController) {
      this.formController = new FormController(
        this.values ?? this.model,
        this.modelFacade,
        this.model
      );
    }

    this.className = this.formController.getClassName() ?? '';
    this.getSteps(Reflect.getMetadata(VISIBILITY_PREFIX_ALL, this.model));

    this.cdRef.detectChanges();
  }

  getSteps(fileFields: any) {
    for (let i = 0; i < fileFields.length; i++) {
      const field = Reflect.getMetadata(
        VISIBILITY_PREFIX,
        this.model,
        fileFields[i]
      );

      let currentStep = this.steps.find(
        (step) => step.title === field.showModal
      );

      if (!currentStep) {
        currentStep = {
          index: field.index,
          arrayIndex: this.steps.length + 1,
          title: field.showModal,
          description: field.showDetail ?? '',
          fields: [],
        };
        this.steps.push(currentStep);
      }

      currentStep.fields.push(fileFields[i]);
    }
  }

  nextStep() {
    if (this.currentStep !== this.steps.length) {
      this.stepperComponent.next();
      this.currentStep++;
    }
    this.formStepValid = false;
  }

  prevStep() {
    if (this.currentStep !== 0) {
      this.stepperComponent.previous();
      this.currentStep--;
    }
  }

  isValid() {
   }
  fireAction() {
    const form = this.formController.getForm().value;
    if (this.scope && this.scope.length > 0) {
      form[this.scope[0].key] = this.scope[0].value;
    }

    if (this.edit) {
      this.modelFacade.base.update(form);
      this._matDialog.closeAll();
    } else {
      this.modelFacade.base.add(form);
      this._matDialog.closeAll();
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
