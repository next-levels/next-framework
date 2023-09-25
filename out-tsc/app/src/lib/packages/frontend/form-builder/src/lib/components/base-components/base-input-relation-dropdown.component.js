"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputRelationDropdownComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const forms_1 = require("@angular/forms");
const core_2 = require("@ngx-translate/core");
const src_1 = require("../../../../../angular-commons/src");
const base_input_component_1 = require("./base-input.component");
let BaseInputRelationDropdownComponent = class BaseInputRelationDropdownComponent extends base_input_component_1.BaseInputComponent {
    constructor(store, cdRef, translateService, registry) {
        super(cdRef, translateService);
        this.store = store;
        this.cdRef = cdRef;
        this.translateService = translateService;
        this.registry = registry;
        this.data = [];
        this.options = [];
    }
    init() {
        if (this.formField.name) {
            const model = this.formController?.getModelDefinition();
            this.options = model?.getFieldValues(this.formField?.name);
        }
    }
    logChange(event) {
        this.fg.patchValue({ [this.formField.name]: event?.value });
        this.dataOutput.emit(event?.value);
    }
    ngOnInit() {
        this.settings = this.formController
            .getModelDefinition()
            .relations(this.formField.name);
        this.fg = this.formController?.getForm();
        this.formField.label = this.formField.label ?? this.formField.name;
        this.dependency = this.formController?.getDependency(this.formField.name);
        this.visibilityOptions = this.formController?.getVisibility(this.formField.name);
        if (this.formField) {
            this.translateService
                .get(this.formController.getElementLabel(this.formField.name))
                .subscribe((translated) => {
                this.formField.label = translated ?? this.formField.name;
                if (this.formField?.required) {
                    this.formField.label = this.formField.label + '*';
                }
            });
        }
        if (this.settings.action !== undefined &&
            this.settings.selector !== undefined) {
            this.store.dispatch(this.settings.action);
            this.store.pipe((0, store_1.select)(this.settings.selector)).subscribe((data) => {
                this.data = data;
                console.log(data);
                this.mapData(data);
            });
        }
        else {
            if (this.registry.retrieve(this.formController.getClassName())) {
                this.facade = this.registry.retrieve(this.formController.getClassName());
                this.facade.base.loadFiltered();
                console.log(this.facade.base.filtered$);
                this.facade.base.filtered$.subscribe((data) => this.mapData(data));
            }
        }
        this._value = '';
        this.formControl = new forms_1.FormControl(this._value, [forms_1.Validators.required]);
        if (this.formController && this.formField.name) {
            this.formController.addFormControl(this.formControl, this.formField.name);
        }
        this.fg = this.formController.getForm();
        this.initFilter();
    }
    initFilter() {
        if (this.dependency?.field &&
            this.fg?.controls[this.dependency.field] &&
            this.dependency?.value === undefined) {
            this.fg.controls[this.dependency.field].valueChanges.subscribe((value) => {
                this.mapData(this.filterArrayByProperty(this.data, this.dependency?.field, value));
                this.cdRef.detectChanges();
            });
        }
    }
    filterArrayByProperty(array, propName, value) {
        return array.filter((item) => item[propName] === value);
    }
    mapData(data) {
        this.options = data.map((selectedFieldArray) => {
            const fieldValues = [];
            this.settings.fields.forEach((field) => {
                let value = selectedFieldArray;
                field.split('.').forEach((key) => {
                    value = value ? value[key] : null;
                });
                if (value !== null)
                    fieldValues.push(value);
            });
            return {
                value: selectedFieldArray['id'],
                label: fieldValues.join(' | '),
            };
        });
        if (this.formField.name) {
            const value = this.formController.getValue(this.formField.name);
            const index = this.options.findIndex((a) => a.value == value);
            if (index > -1) {
                this.selected = this.options[index].value;
            }
        }
    }
};
exports.BaseInputRelationDropdownComponent = BaseInputRelationDropdownComponent;
exports.BaseInputRelationDropdownComponent = BaseInputRelationDropdownComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-relation-dropdown',
        template: '<ng-container ></ng-container>',
    }),
    tslib_1.__metadata("design:paramtypes", [store_1.Store,
        core_1.ChangeDetectorRef,
        core_2.TranslateService,
        src_1.InstanceRegistryService])
], BaseInputRelationDropdownComponent);
//# sourceMappingURL=base-input-relation-dropdown.component.js.map