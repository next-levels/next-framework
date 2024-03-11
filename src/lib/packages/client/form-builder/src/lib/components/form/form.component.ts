import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges,} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormController} from '../../controller/form-controller';
import {BUILDERFIELD_ALL_PREFIX, FORMFIELD_PREFIX} from '@next-levels/types';
import {TranslateService} from "@ngx-translate/core";
import {FORM, InstanceRegistryService} from "@next-levels/next-framework-client";

class FormSettings {
    fields?: string[];
    readOnly? = false;
    noLabel? = false;
    submitted? = false;
    formSmall? = false;
    nowrap? = true;
    scope?: any;
}

@Component({
    selector: 'nxtlvls-form',
    templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

    @Input() formModel: any;
    @Input() data: any;
    @Input() tab: string;
    @Input() settings: FormSettings = new FormSettings();

    @Output() dataOutput = new EventEmitter<FormController>();


    model: any;
    fields: string[] = [];
    controller: FormController;
    readOnly = false;
    formValid = new EventEmitter<boolean>();
    fg: FormGroup;

    public groups: {
        index: number;
        arrayIndex: number;
        key: string;
        title: string;
        description: string;
        fields: any[];
    }[] = [];

    constructor(private changeDetectorRef: ChangeDetectorRef, private translate: TranslateService, private registry: InstanceRegistryService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['formModel']) {
            this.changeDetectorRef.detectChanges();
        }
        if (changes['data']) {
            this.ngOnInit();
            this.changeDetectorRef.markForCheck();
        }
    }

    trackByFn(index, item) {
        return item.id; // or any unique property of the items
    }

    ngOnInit(): void {
        if (this.formModel) {
            this.model = new this.formModel();

            if (!this.data) {
                this.data = this.model;
            }

            this.controller = new FormController(
                this.data,
                this.registry.retrieve(this.formModel),
                this.model,
                this.settings
            );


            this.dataOutput.emit(this.controller);

            this.fg = this.controller.getForm();
            const className = this.controller.getClassName() ?? '';
            let fileFields = FORM.hasDetailFields(this.model) ? this.model.detailFields() : null

            if(this.tab) {
              if(this.tab === 'header') {
                fileFields = fileFields.header;
              }else {
                fileFields = fileFields.tabs[this.tab];
              }
            }



            if (!fileFields) {
                let visibilityFields = Reflect.getMetadata(BUILDERFIELD_ALL_PREFIX, this.model);
                fileFields = [{general: visibilityFields}]
            }

            if (fileFields) {

                this.groups = fileFields.map((field: any, index: number) => {
                    const firstKey = Object.keys(field)[0];

                    let title = this.translate.instant(className + '.groups.' + firstKey + '.name')
                    let description = this.translate.instant(className + '.groups.' + firstKey + '.description')

                    if (description === className + '.groups.' + firstKey + '.description') {
                        description = '';
                    }

                    this.fields.push(...field[firstKey])

                    return {
                        index: index,
                        arrayIndex: index + 1,
                        title: title,
                        description: description,
                        fields: field[firstKey],
                    };
                });

            }

            this.changeDetectorRef.detectChanges();
        }
    }

    isFormValid(event: any) {
        if (!event) {
            return this.formValid.emit(false);
        }

        for (let i = 0; i < this.fields.length; i++) {
            if (this.controller?.getForm()?.get(this.fields[i])?.invalid) {
                return this.formValid.emit(false);
            }
        }

        this.formValid.emit(true);
    }

}
