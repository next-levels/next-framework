import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormController } from '../../controller/form-controller';
import { FormControl } from '@angular/forms';
import {
  BUILDERFIELD_PREFIX,
  FORMFIELD_PREFIX,
  FormComponents,
  FormOptions,
} from '../../../../../../shared/generics/src';

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
  @Output() dataOutput = new EventEmitter<any>();

  constructor(
    private cdRef: ChangeDetectorRef,
    @Inject('formBuilderComponents')
    private formBuilderComponents: FormComponents
  ) {}

  ngAfterViewInit() {
    let componentRef;

    if (this.view !== undefined && this.fieldName) {
      this.formField = Reflect.getMetadata(
        FORMFIELD_PREFIX,
        this.formController?.getModelDefinition(),
        this.fieldName
      );

      let baseField = Reflect.getMetadata(
        BUILDERFIELD_PREFIX,
        this.formController?.getModelDefinition(),
        this.fieldName
      );

      this.formField = { ...this.formField, ...baseField };
      this.formField.name = this.fieldName;
      if (!this.formField.type) {
        return;
      }

      const componentRef = this.view.createComponent(
        this.formBuilderComponents[this.formField.type]
      );
      this.initComponent(componentRef);
    }
  }

  initComponent(componentRef: any) {
    componentRef.instance.formField = this.formField;
    componentRef.instance.formController = this.formController;
    componentRef.instance.dataOutput = this.dataOutput;
  }

  getFormControl(): FormControl | null {
    if (this.formController && this.fieldName) {
      return this.formController.getControl(this.fieldName);
    }

    return null;
  }
}
