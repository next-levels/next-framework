import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  DependencyOptions,
  FormOptions,
  VisibilityOptions,
} from '@next-levels/types';
import { FormController } from '../../controller/form-controller';

@Component({
  template: '<ng-container ></ng-container>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseInputComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-col';
  @Input() formField: FormOptions;
  @Input() formController: FormController | undefined;
  @Output() dataOutput = new EventEmitter<any>();
  protected fg: FormGroup | undefined;
  protected formControl: FormControl | undefined;
  protected changed = false;
  protected dependency: DependencyOptions | null | undefined = null;
  value = '';
  disabled = false;
  updateOn: 'change' | 'blur' | 'submit' | undefined = 'change';
  visibilityOptions: VisibilityOptions;
  comment: string | undefined;
  headline: string | undefined;

  constructor(
    public cdRef: ChangeDetectorRef,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (this.formField && this.formField.name && this.formController) {
      this.fg = this.formController?.getForm();
      this.formField.label = this.formField.label ?? this.formField.name;
      this.dependency = this.formController?.getDependency(this.formField.name);
      this.value = this.formController?.getValue(this.formField.name);
      this.disabled = this.formField.disabled ?? this.disabled;
      this.updateOn = this.formField.updateOn;

      this.visibilityOptions = this.formController?.getVisibility(
        this.formField.name
      );
      if (this.visibilityOptions?.comment) {
        this.translateService
          .get(
            this.formController.getElementLabel(this.visibilityOptions.comment)
          )
          .subscribe((translated: string) => {
            this.comment = translated;
          });
      }
      if (this.visibilityOptions?.headline) {
        this.translateService
          .get(
            this.formController.getElementLabel(this.visibilityOptions.headline)
          )
          .subscribe((translated: string) => {
            this.headline = translated;
          });
      }
      this.initFormControl();
      this.initDependency();
      this.init();
    }
  }

  private initFormControl() {
    const validators = [];
    if (this.formField?.validation && this.formField.validation.validation) {
      validators.push(Validators.pattern(this.formField.validation.validation));
    }

    if (this.formField) {
      this.translateService
        .get(this.formController.getElementLabel(this.formField.name))
        .subscribe((translated: string) => {
          this.formField.label = translated ?? this.formField.name;

          if (this.formField.noLabel) {
            this.formField.label = null;
          }
          if (this.formField?.required) {
            validators.push(Validators.required);
            //   this.formField.label = this.formField.label + '*';
          }
        });
    }

    // Create a new form control with the given values
    this.formControl = new FormControl(
      {
        value: this.value,
        disabled: this.disabled,
      },
      {
        validators: validators,
        updateOn: this.updateOn,
      }
    );

    if (this.formControl && this.formField.name) {
      this.formController?.addFormControl(
        this.formControl,
        this.formField.name
      );
    }
  }

  protected initDependency() {
    if (this.dependency?.field && this.fg?.controls[this.dependency.field]) {
      // Get initial value of the dependency and check if the dependency is valid
      const initalValue = this.formController?.getValue(this.dependency.field);
      this.checkDependency(initalValue);

      // Subscribe to value changes of the dependency
      this.fg.controls[this.dependency.field].valueChanges.subscribe(
        (value: any) => {
          this.checkDependency(value);
        }
      );
    }
  }

  init() {
    // override this method in child classes
  }

  protected checkDependency(value: any) {
    if (this.dependency?.field && this.formField) {
      if (this.fg?.controls[this.dependency.field]) {
        const dependencyValue = this.dependency.value;
        this.formField.hidden = dependencyValue !== value && dependencyValue;
      }
    }
  }

  changeValue(value: any) {
    this.dataOutput.emit(value);
  }
}
