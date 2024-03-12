import 'reflect-metadata';
import {AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit,} from '@angular/core';
import {SwalService} from '../../services/swal/swal.service';
import {MinimizeService} from '../../services/minimize/minimize.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormController} from '../../../../../form-builder/src';
import {ScopeFilter,} from '@next-levels/types';

@Component({
  selector: 'create-simple',
  templateUrl: './create-simple.component.html',
})
export class CreateSimpleComponent implements AfterViewInit, OnInit {
  public formStepValid = false;

  formController: FormController;

  @Input() model: any;
  @Input() values: any;
  state: any;
  @Input() action: () => void;
  @Input() edit = false;
  @Input() modelFacade: any;
  @Input() scope: ScopeFilter[];
  @Input() config: any[];

  className = '';

  constructor(
    private swalService: SwalService,
    public dialogRef: MatDialogRef<CreateSimpleComponent>,
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
    this.config = data.config;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    this.cdRef.detectChanges();
  }


  isValid() {
  }

  fireAction() {
    console.log(this.formController.getForm().value)
    this.dialogRef.close(this.formController.getForm().value);
  }

  dataOutput(event: FormController) {
    this.formController = event;
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
