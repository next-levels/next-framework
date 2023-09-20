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
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { TranslateService } from '@ngx-translate/core';
import { FormController } from '../../../../../form-builder/src';
import {
  BUILDERFIELD_ALL_PREFIX,
  BUILDERFIELD_PREFIX,
  ListOptions,
  ScopeFilter,
  VISIBILITY_PREFIX_ALL,
} from '../../../../../../shared/generics/src';
import { ListController } from '../../controllers/ListController';

@Component({
  selector: 'view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.scss'],
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
    private readonly _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      model: any;
      modelFacade: any;
      formController: FormController;
      edit: boolean;
      values: any;
    },
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
    this._fields = Reflect.getMetadata(BUILDERFIELD_ALL_PREFIX, this.model);

    this.cdRef.detectChanges();
  }

  public getSettingsField(field: string): ListOptions {
    return Reflect.getMetadata(BUILDERFIELD_PREFIX, this.model, field);
  }

  close() {
    this._matDialog.closeAll();
  }
}
