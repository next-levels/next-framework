import { FormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  DependencyOptions,
  META,
  VISIBILITY_PREFIX,
  VisibilityOptions,
} from '../../../../../shared/generics/src';

export class FormController {
  protected model: any;
  protected modelDefinition: any = null;
  protected form: UntypedFormGroup;
  protected store: Store<any>;
  protected facade: any;

  private beforeSaveFunction: (param: any) => any = null;

  constructor(model: any, facade: any = null, modelDefinition: any = null) {
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
    this.form = new UntypedFormGroup({}, null, null);
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
  save(formValues: any = null): void {
    if (this.form.valid) {
      this.facade.save(this.form.value);
    }
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

  getElementLabel(fieldName: string) {
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
}
