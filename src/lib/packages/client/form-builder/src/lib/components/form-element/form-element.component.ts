import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormController } from '../../controller/form-controller';
import { FormControl } from '@angular/forms';
import {
  BUILDERFIELD_PREFIX,
  FormComponents,
  FORMFIELD_PREFIX,
  FormOptions,
} from '@next-levels/types';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nxt-form-element',
  templateUrl: './form-element.component.html',
})
export class FormElementComponent implements AfterViewInit {
  @ViewChild('input', { read: ViewContainerRef }) view:
    | ViewContainerRef
    | undefined;

  @Input() formField: FormOptions;
  @Input() formController!: FormController;
  @Input() fieldName = '';
  @Input() noLabel = false;
  @Input() model: any;
  @Output() dataOutput = new EventEmitter<any>();
  @Input() readOnly = false;

  firstChange = true;

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject('formBuilderComponents')
    private formBuilderComponents: FormComponents,
    private _translate: TranslateService
  ) {}

  @HostBinding('class') get classList(): string {
    let classes = '';

    if (this.formField?.options?.size === 'full') {
      classes += 'basis-1/1 ';
      classes += 'w-full ';
    }

    return classes.trim();
  }

  @HostBinding('class.basis-1/2') get applyDefault() {
    return (
      !this.formField?.options?.size ||
      this.formField?.options?.size === 'default'
    ); // 'my-class' will be applied based on this condition
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fieldName']) {
      this.cdRef.markForCheck();
    }
    if (changes['formController']) {
      if (this.firstChange) {
        this.rebuild();
        this.cdRef.markForCheck();
      } else {
        this.firstChange = false;
      }
    }
  }

  ngAfterViewInit() {
    if (this.view !== undefined && this.fieldName) {
      let formModel = this.formController?.getModelDefinition();

      if (!formModel && this.model) {
        formModel = this.model;
      }
      this.formField = Reflect.getMetadata(
        FORMFIELD_PREFIX,
        formModel,
        this.fieldName
      );

      let baseField = Reflect.getMetadata(
        BUILDERFIELD_PREFIX,
        formModel,
        this.fieldName
      );

      this.formField = { ...this.formField, ...baseField };
      this.formField.name = this.fieldName;
      if (!this.formField.type) {
        return;
      }
      if (this.noLabel) {
        this.formField.noLabel = true;
      }

      const componentRef = this.view.createComponent(
        this.formBuilderComponents[this.formField.type]
      );

      this.initComponent(componentRef);
    } else if (this.view !== undefined && this.formField) {
      const componentRef = this.view.createComponent(
        this.formBuilderComponents[this.formField.type]
      );

      this.initComponent(componentRef);
    }
  }

  rebuild() {
    this.view?.clear();
    this.ngAfterViewInit();
  }

  initComponent(componentRef: any) {
    if (this.readOnly) {
      this.formField.disabled = true;
    }
    componentRef.instance.formField = this.formField;

    if (this.formController) {
      componentRef.instance.formController = this.formController;
    } else {
      componentRef.instance.formController = new FormController({});
    }
    componentRef.instance.dataOutput = this.dataOutput;
  }

  getFormControl(): FormControl | null {
    if (this.formController && this.fieldName) {
      return this.formController.getControl(this.fieldName);
    }

    return null;
  }
}
