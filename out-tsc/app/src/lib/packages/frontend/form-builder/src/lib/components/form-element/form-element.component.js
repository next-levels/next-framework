"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormElementComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const form_controller_1 = require("../../controller/form-controller");
const src_1 = require("../../../../../../shared/generics/src");
let FormElementComponent = class FormElementComponent {
    constructor(cdRef, formBuilderComponents) {
        this.cdRef = cdRef;
        this.formBuilderComponents = formBuilderComponents;
        this.fieldName = '';
        this.dataOutput = new core_1.EventEmitter();
    }
    ngAfterViewInit() {
        let componentRef;
        if (this.view !== undefined && this.fieldName) {
            this.formField = Reflect.getMetadata(src_1.FORMFIELD_PREFIX, this.formController?.getModelDefinition(), this.fieldName);
            let baseField = Reflect.getMetadata(src_1.BUILDERFIELD_PREFIX, this.formController?.getModelDefinition(), this.fieldName);
            this.formField = { ...this.formField, ...baseField };
            this.formField.name = this.fieldName;
            if (!this.formField.type) {
                return;
            }
            const componentRef = this.view.createComponent(this.formBuilderComponents[this.formField.type]);
            this.initComponent(componentRef);
        }
    }
    initComponent(componentRef) {
        componentRef.instance.formField = this.formField;
        componentRef.instance.formController = this.formController;
        componentRef.instance.dataOutput = this.dataOutput;
    }
    getFormControl() {
        if (this.formController && this.fieldName) {
            return this.formController.getControl(this.fieldName);
        }
        return null;
    }
};
exports.FormElementComponent = FormElementComponent;
tslib_1.__decorate([
    (0, core_1.ViewChild)('input', { read: core_1.ViewContainerRef }),
    tslib_1.__metadata("design:type", core_1.ViewContainerRef)
], FormElementComponent.prototype, "view", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], FormElementComponent.prototype, "formField", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", form_controller_1.FormController)
], FormElementComponent.prototype, "formController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], FormElementComponent.prototype, "fieldName", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], FormElementComponent.prototype, "dataOutput", void 0);
exports.FormElementComponent = FormElementComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-form-element',
        templateUrl: './form-element.component.html',
    }),
    tslib_1.__param(1, (0, core_1.Inject)('formBuilderComponents')),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef, Object])
], FormElementComponent);
//# sourceMappingURL=form-element.component.js.map