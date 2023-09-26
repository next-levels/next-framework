"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const core_2 = require("@ngx-translate/core");
const form_controller_1 = require("../../controller/form-controller");
let BaseInputComponent = class BaseInputComponent {
    constructor(cdRef, translateService) {
        this.cdRef = cdRef;
        this.translateService = translateService;
        this.class = 'flex flex-col';
        this.dataOutput = new core_1.EventEmitter();
        this.changed = false;
        this.dependency = null;
        this.value = '';
        this.disabled = false;
        this.updateOn = 'change';
    }
    ngOnInit() {
        if (this.formField && this.formField.name) {
            this.fg = this.formController?.getForm();
            this.formField.label = this.formField.label ?? this.formField.name;
            this.dependency = this.formController?.getDependency(this.formField.name);
            this.value = this.formController?.getValue(this.formField.name);
            this.disabled = this.formField.disabled ?? this.disabled;
            this.updateOn = this.formField.updateOn;
            this.visibilityOptions = this.formController?.getVisibility(this.formField.name);
            if (this.visibilityOptions?.comment) {
                this.translateService
                    .get(this.formController.getElementLabel(this.visibilityOptions.comment))
                    .subscribe((translated) => {
                    this.comment = translated;
                });
            }
            if (this.visibilityOptions?.headline) {
                this.translateService
                    .get(this.formController.getElementLabel(this.visibilityOptions.headline))
                    .subscribe((translated) => {
                    this.headline = translated;
                });
            }
            this.initFormControl();
            this.initDependency();
            this.init();
        }
    }
    initFormControl() {
        const validators = [];
        if (this.formField?.validation && this.formField.validation.validation) {
            validators.push(this.formField.validation.validation);
        }
        if (this.formField) {
            this.translateService
                .get(this.formController.getElementLabel(this.formField.name))
                .subscribe((translated) => {
                this.formField.label = translated ?? this.formField.name;
                if (this.formField?.required) {
                    validators.push(forms_1.Validators.required);
                    this.formField.label = this.formField.label + '*';
                }
            });
        }
        // Create a new form control with the given values
        this.formControl = new forms_1.FormControl({
            value: this.value,
            disabled: this.disabled,
        }, {
            validators: validators,
            updateOn: this.updateOn,
        });
        if (this.formControl && this.formField.name) {
            this.formController?.addFormControl(this.formControl, this.formField.name);
        }
    }
    initDependency() {
        if (this.dependency?.field && this.fg?.controls[this.dependency.field]) {
            // Get initial value of the dependency and check if the dependency is valid
            const initalValue = this.formController?.getValue(this.dependency.field);
            this.checkDependency(initalValue);
            // Subscribe to value changes of the dependency
            this.fg.controls[this.dependency.field].valueChanges.subscribe((value) => {
                this.checkDependency(value);
            });
        }
    }
    init() {
        // override this method in child classes
    }
    checkDependency(value) {
        if (this.dependency?.field && this.formField) {
            if (this.fg?.controls[this.dependency.field]) {
                const dependencyValue = this.dependency.value;
                this.formField.hidden = dependencyValue !== value;
            }
        }
    }
    changeValue(value) {
        this.dataOutput.emit(value);
    }
};
exports.BaseInputComponent = BaseInputComponent;
tslib_1.__decorate([
    (0, core_1.HostBinding)('class'),
    tslib_1.__metadata("design:type", Object)
], BaseInputComponent.prototype, "class", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseInputComponent.prototype, "formField", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", form_controller_1.FormController)
], BaseInputComponent.prototype, "formController", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], BaseInputComponent.prototype, "dataOutput", void 0);
exports.BaseInputComponent = BaseInputComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        template: '<ng-container ></ng-container>',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_2.TranslateService])
], BaseInputComponent);
//# sourceMappingURL=base-input.component.js.map