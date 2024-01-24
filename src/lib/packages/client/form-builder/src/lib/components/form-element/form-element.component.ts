import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {FormController} from '../../controller/form-controller';
import {FormControl} from '@angular/forms';
import {BUILDERFIELD_PREFIX, FormComponents, FORMFIELD_PREFIX, FormOptions,} from '@next-levels/types';

@Component({
    selector: 'nxt-form-element',
    templateUrl: './form-element.component.html',
})
export class FormElementComponent implements AfterViewInit {
    @ViewChild('input', {read: ViewContainerRef}) view:
        | ViewContainerRef
        | undefined;

    @Input() formField: FormOptions;
    @Input() formController!: FormController;
    @Input() fieldName = '';
    @Output() dataOutput = new EventEmitter<any>();
    @Input() readOnly = false;

    firstChange = true;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['fieldName']) {
            this.cdRef.detectChanges();
        }
        if (changes['formController']) {
            console.log(this.firstChange)
            if (!this.firstChange) {
            this.rebuild();
            this.cdRef.markForCheck();
            }else {
                this.firstChange = false;
            }
        }
    }

    constructor(
        private cdRef: ChangeDetectorRef,
        @Inject('formBuilderComponents')
        private formBuilderComponents: FormComponents
    ) {
    }

    ngAfterViewInit() {
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

            this.formField = {...this.formField, ...baseField};
            this.formField.name = this.fieldName;
            if (!this.formField.type) {
                return;
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
        console.log('rebuild')
        console.log('fieldName',this.fieldName)
        console.log('formController',this.formController)
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
