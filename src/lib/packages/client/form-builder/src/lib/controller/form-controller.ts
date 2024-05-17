import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  constructZodSchemaFromClass,
  constructZodSchemaFromClassField,
  DependencyOptions,
  META,
  VISIBILITY_PREFIX,
  VisibilityOptions,
} from '@next-levels/types';
import { z } from 'zod';
import { Subject, takeUntil } from 'rxjs';

export class FormController {
  public formOptions: any = { small: false };
  protected model: any;
  protected modelDefinition: any = null;
  protected form: UntypedFormGroup;
  protected store: Store<any>;
  protected facade: any;
  private beforeSaveFunction: (param: any) => any = null;

  private destroy$ = new Subject<void>();
  private lastFormValues: any;

  constructor(
    model: any,
    facade: any = null,
    modelDefinition: any = null,
    formOptions: any = null
  ) {
    if (facade) {
      this.store = facade.store;
      this.facade = facade;
    }

    this.model = model;
    if (modelDefinition) {
      this.modelDefinition = modelDefinition;
    } else {
      this.modelDefinition = model;
    }
    if (formOptions) {
      this.formOptions = formOptions;
    }

    this.form = new UntypedFormGroup({}, null, null);
    this.lastFormValues = this.form.value;
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((currentValues) => {
        this.detectChangedField(currentValues);
        // Update lastFormValues with the current form state
        this.lastFormValues = currentValues;
      });
  }

  getClassName() {
    return META.getNameByModel(this.getModelDefinition());
  }

  addFormControl(control: FormControl, name: string) {
    this.form.addControl(name, control);
  }

  setModel(model: any) {
    this.model = model;
  }

  makeFormGroupReadOnly(): void {
    this.makeFormReadOnly(this.form);
  }

  makeFormReadOnly(formGroup: UntypedFormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control instanceof UntypedFormGroup) {
        this.makeFormReadOnly(control);
      } else {
        control.disable();
      }
    });
  }

  save(formValues: any = null): boolean {
    this.validateForm(this.modelDefinition);
    if (this.form.valid) {
      let formData = this.filterNullFields(this.form.value);
      this.facade.base.add(formData);
    }
    return this.form.valid;
  }

  update(formValues: any = null, model = this.modelDefinition): void {
    this.validateForm(model);
    if (this.form.valid) {
      this.facade.base.update(this.form.value);
    }
  }

  detectChangedField(currentValues: any) {
    const changedFields = [];
    for (const field in currentValues) {
      if (currentValues[field] !== this.lastFormValues[field]) {
        changedFields.push(field);
      }
    }

    this.validateField(changedFields[0], currentValues[changedFields[0]]);
  }

  validateField(fieldName: string, value: any) {
    const schema = constructZodSchemaFromClassField(
      this.modelDefinition.constructor,
      fieldName
    );

    try {
      schema.parse(value);
      this.form.get(fieldName).setErrors(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set the form control to invalid and pass the Zod error message
        this.form.get(fieldName).setErrors({ zodError: error });
      }
    }
  }

  validateForm(model: any) {
    const validModel = constructZodSchemaFromClass(
      model.constructor,
      this.form
    );

    try {
      validModel.parse(this.form.value);
      // Process valid data
    } catch (error) {
      if (error instanceof z.ZodError) {
        this.applyZodErrorsToForm(error.errors);

        this.form.markAsDirty();
        this.form.markAsTouched();
        this.form.markAllAsTouched();
      }
    }
    return this.form.valid;
  }

  async create(scope: any[] = null) {
    if (this.form.valid) {
      try {
        await this.beforeSave();
        let entity = this.form.value;
        if (scope && scope.length > 0) {
          entity[scope[0].key] = scope[0].value;
        }

        this.facade.base.add(entity);
      } catch (err) {
        // Handle error here.
      }
    }
  }

  filterNullFields(data: any): any {
    return Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== null)
    );
  }

  applyZodErrorsToForm(errors: z.ZodIssue[]): void {
    errors.forEach((error) => {
      const path =
        Array.isArray(error.path) && error.path.length > 1
          ? error.path.join('.')
          : error.path[0].toString();
      const field = this.form.get(path);
      if (field) {
        field.setErrors({ zodError: error });
      }
    });
  }

  applyScope(scope: any) {}

  getForm() {
    return this.form;
  }

  extendForm(form: any): any {
    return form;
  }

  load() {}

  async beforeSave() {
    if (this.beforeSaveFunction) {
      this.form = await this.beforeSaveFunction(this.form);
    }
  }

  cleanForm() {
    this.form.markAsPristine();
  }

  getModel() {
    return this.model;
  }

  getStore() {
    return this.store;
  }

  getControl(fieldName: string): FormControl {
    return this.form.get(fieldName) as FormControl;
  }

  getValue(name: string) {
    if (
      this.model !== undefined &&
      this.model[name as keyof typeof this.model] !== undefined
    ) {
      return this.model[name as keyof typeof this.model] !== undefined
        ? this.model[name as keyof typeof this.model]
        : null;
    }
  }

  patchValues(values: any) {
    this.form.patchValue(values);
  }

  getModelDefinition() {
    return this.modelDefinition;
  }

  getElementLabel(fieldName: string | undefined): string {
    return (
      META.getNameByModel(this.getModelDefinition()) +
      '.properties.' +
      fieldName
    );
  }

  getDependency(fieldName: string): DependencyOptions | null {
    if (!this.getModelDefinition() && !fieldName) {
      return null;
    }
    return Reflect.getMetadata(
      'fb:dependency',
      this.getModelDefinition(),
      fieldName
    );
  }

  getVisibility(fieldName: string): VisibilityOptions | null {
    if (!this.getModelDefinition() && !fieldName) {
      return null;
    }
    return Reflect.getMetadata(
      VISIBILITY_PREFIX,
      this.getModelDefinition(),
      fieldName
    );
  }

  registerBeforeSaveFunction(
    fn: (param: UntypedFormGroup) => UntypedFormGroup
  ) {
    this.beforeSaveFunction = fn;
  }

  getErrorMessage(
    controlName: string | undefined,
    field: string | undefined
  ): string {
    const control: FormControl = this.getControl(controlName) as FormControl;
    if (control.errors) {
      for (const errorKey in control.errors) {
        const i18nPath = `model.errors.${controlName}.${errorKey}`;
        console.log(control.errors);
        const defaultMessage = this.getDefaultMessage(
          control.errors[errorKey].issues,
          field
        );
        return defaultMessage;
        //  let translation = this._translate.instant(i18nPath, params);
        /*
                if (translation === i18nPath) {
                  return defaultMessage; // Fallback to default if no translation found
                }
                return translation;

         */
      }
    }
    return ''; // Return empty if no errors
  }

  private getDefaultMessage(errors: z.ZodIssue[], property: string): string {
    console.log('errors', errors);
    if (errors.length > 0) {
      const error = errors[0];
      console.log('error', error);
      switch (error.code) {
        case 'invalid_type':
          return 'This field is required';
        case 'too_small':
          console.log('error.minimum', error.minimum);

          if (error.minimum == 1) {
            return `${property} wird benötigt`;
          }

          return `Feld sollte mindestens ${error.minimum} lang sein.`;
        // Add other cases as necessary
        default:
          return 'Invalid field';
      }
    }
    return 'Invalid field';
  }
}
