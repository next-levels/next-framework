import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges,} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormController} from '../../controller/form-controller';
import {
  BUILDERFIELD_ALL_PREFIX,
  BUILDERFIELD_PREFIX,
  decorator_models_key,
  FormOptions, META,
  VISIBILITY_PREFIX,
  VISIBILITY_PREFIX_ALL
} from '@next-levels/types';
import {TranslateService} from "@ngx-translate/core";
import {InstanceRegistryService} from "@next-levels/next-framework-client";

class FormSettings {
    fields?: string[];
    readOnly? = false;
    noLabel? = false;
    submitted? = false;
    formSmall? = false;
    scope?: any;
}

@Component({
    selector: 'nxtlvls-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

    @Input() formModel: string;
    @Input() data: any;
    @Input() settings: FormSettings;


    model: any;
    formFields!: FormOptions[];
    fields: string[];
    _fields: string[];
    controller: FormController;
    readOnly = false;
    noLabel = false;
    submitted = false;
    formValid = new EventEmitter<boolean>();
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

    constructor(private changeDetectorRef: ChangeDetectorRef, private translate: TranslateService,private registry:InstanceRegistryService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['fields']) {
            this._fields = this.fields;
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
                  this.formFields = visibilityFields.filter((field) => {
                     return this.fields.includes(field);
                 })
                     .map(field => {
                    return {name:field,...Reflect.getMetadata(
                        BUILDERFIELD_PREFIX,
                        new rootModel(),
                        field
                    )};
                });

                  this.initForm();
                this.rebuildForm();
            }else {
                this._fields = this.fields ?? this.formFields.map((field) => field.name);
                this.initForm();
            }
         }
    }

  initForm() {
    this.model =META.getModelByName(this.formModel)

    if(!this.data){
      this.data = new this.model();
    }
       this.controller = new FormController(
        this.data,
        this.registry.retrieve(this.model),
        new this.model(),
        {small: true}
      );
       this.changeDetectorRef.detectChanges();
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

        this._fields = [];
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
