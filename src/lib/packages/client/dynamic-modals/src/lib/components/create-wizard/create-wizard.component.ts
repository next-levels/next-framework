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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { FORM, FormController } from '../../../../../form-builder/src';
import {
  BUILDERFIELD_ALL_PREFIX,
  LISTFIELD_ALL_PREFIX,
  META,
  ScopeFilter,
  SYSTEM_SCHEMA_METADATA_KEY,
} from '@next-levels/types';

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
  @Input() config: any[];

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
      config: any[];
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
    this.config = data.config;
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

    const viewController = META.getFormController(this.model) ?? this.model;
    const fileFields = FORM.hasCreateFields(viewController)
      ? viewController.createFields()
      : null;

    if (fileFields && fileFields.length > 0) {
      this.steps = fileFields.map((tab: any, index: number) => {
        const firstKey = Object.keys(tab)[0];
        return {
          index: index,
          arrayIndex: index + 1,
          title: firstKey,
          description: tab.description,
          fields: tab[firstKey],
        };
      });
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

      let systemFields =
        Reflect.getMetadata(SYSTEM_SCHEMA_METADATA_KEY, this.model) || [];

      fields = fields.filter((field) => !systemFields.includes(field));

      this.getStepsConfig(fields);
    }

    this.cdRef.detectChanges();
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

  isValid() {}

  fireAction() {
    const form = this.formController.getForm().value;

    if (this.scope && this.scope.length > 0) {
      form[this.scope[0].key] = this.scope[0].value;
    }

    if (this.edit) {
      this.formController.update();
      this._matDialog.closeAll();
    } else {
      let success = this.formController.save();
      if (success) {
        this._matDialog.closeAll();
      }
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
