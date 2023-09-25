"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSetComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const form_controller_1 = require("../../controller/form-controller");
let FormSetComponent = class FormSetComponent {
    constructor() {
        this.readOnly = false;
        this.noLabel = false;
        this.submitted = false;
        this.formValid = new core_1.EventEmitter();
    }
    ngOnInit() {
        if (this.formFields || this.fields) {
            this.fg = this.controller.getForm();
        }
    }
    isFormValid(event) {
        if (!event) {
            return this.formValid.emit(false);
        }
        if (this.formFields) {
            for (let i = 0; i < this.formFields.length; i++) {
                const formFieldName = this.formFields[i]?.name;
                if (formFieldName &&
                    this.controller?.getForm()?.get(formFieldName)?.invalid) {
                    return this.formValid.emit(false);
                }
            }
        }
        else {
            for (let i = 0; i < this.fields.length; i++) {
                if (this.controller?.getForm()?.get(this.fields[i])?.invalid) {
                    return this.formValid.emit(false);
                }
            }
        }
        this.formValid.emit(true);
    }
};
exports.FormSetComponent = FormSetComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Array)
], FormSetComponent.prototype, "formFields", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Array)
], FormSetComponent.prototype, "fields", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", form_controller_1.FormController)
], FormSetComponent.prototype, "controller", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], FormSetComponent.prototype, "readOnly", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], FormSetComponent.prototype, "noLabel", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], FormSetComponent.prototype, "submitted", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], FormSetComponent.prototype, "formValid", void 0);
exports.FormSetComponent = FormSetComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxtlvls-form-set',
        templateUrl: './form-set.component.html',
    })
], FormSetComponent);
//# sourceMappingURL=form-set.component.js.map