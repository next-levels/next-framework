import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges,} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormController} from '../../controller/form-controller';
import {
    BUILDERFIELD_PREFIX,
    decorator_models, decorator_models_key, decorator_models_options,
    FormOptions,
    VISIBILITY_PREFIX,
    VISIBILITY_PREFIX_ALL
} from '@next-levels/types';
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'nxtlvls-form-set',
    templateUrl: './form-set.component.html',
})
export class FormSetComponent implements OnInit {
    @Input() formFields!: FormOptions[];
    @Input() fields: string[];
    @Input() controller: FormController;
    @Input() readOnly = false;
    @Input() noLabel = false;
    @Input() submitted = false;
    @Output() formValid = new EventEmitter<boolean>();
    fg: FormGroup;

    groups_active = false;


    public groups: {
        index: number;
        arrayIndex: number;
        key: string;
        title: string;
        description: string;
        fields: any[];
    }[] = [];

    constructor(private changeDetectorRef: ChangeDetectorRef, private translate: TranslateService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['fields']) {
            if (this.groups_active && this.formFields) {
                this.rebuildForm();
                console.log(this.groups)
            }
            this.changeDetectorRef.detectChanges();
        }
        if (changes['controller']) {
            this.changeDetectorRef.markForCheck();
        }
    }

    trackByFn(index, item) {
        return item.id; // or any unique property of the items
    }

    ngOnInit(): void {
        if ((this.formFields || this.fields) && this.controller) {
            this.fg = this.controller.getForm();
            let visibilityFields = Reflect.getMetadata(VISIBILITY_PREFIX_ALL, this.controller.getModelDefinition());
            this.groups_active = !!(visibilityFields && visibilityFields.length > 0);
            if (this.groups_active) {
               const rootModel = decorator_models_key.get(this.controller.getClassName());

                this.formFields = visibilityFields.map(field => {
                    return {name:field,...Reflect.getMetadata(
                        BUILDERFIELD_PREFIX,
                        new rootModel(),
                        field
                    )};
                });
                this.rebuildForm();
            }
         }
    }

    rebuildForm() {
        const className = this.controller.getClassName() ?? '';
        for (let i = 0; i < this.formFields.length; i++) {
            const field = Reflect.getMetadata(
                VISIBILITY_PREFIX,
                this.controller.getModelDefinition(),
                this.formFields[i].name
            );

            let currentStep = this.groups.find(
                (step) => step.key === field.showModal
            );

            if (!currentStep) {

                const title = this.translate.instant(className + '.groups.' + field.showModal + '.name')
                const description = this.translate.instant(className + '.groups.' + field.showModal + '.description')

                currentStep = {
                    index: field.index,
                    arrayIndex: this.groups.length + 1,
                    key: field.showModal,
                    title: title,
                    description: description,
                    fields: [],
                };
                this.groups.push(currentStep);
            }

            currentStep.fields.push(this.formFields[i]);
        }

        this.fields = [];
    }

    isFormValid(event: any) {
        if (!event) {
            return this.formValid.emit(false);
        }

        if (this.formFields) {
            for (let i = 0; i < this.formFields.length; i++) {
                const formFieldName = this.formFields[i]?.name;
                if (
                    formFieldName &&
                    this.controller?.getForm()?.get(formFieldName)?.invalid
                ) {
                    return this.formValid.emit(false);
                }
            }
        } else {
            for (let i = 0; i < this.fields.length; i++) {
                if (this.controller?.getForm()?.get(this.fields[i])?.invalid) {
                    return this.formValid.emit(false);
                }
            }
        }
        this.formValid.emit(true);
    }
}
