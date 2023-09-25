"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWizardComponent = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const core_1 = require("@angular/core");
const swal_service_1 = require("../../services/swal/swal.service");
const minimize_service_1 = require("../../services/minimize/minimize.service");
const dialog_1 = require("@angular/material/dialog");
const stepper_1 = require("@angular/material/stepper");
const src_1 = require("../../../../../form-builder/src");
const src_2 = require("../../../../../../shared/generics/src");
let CreateWizardComponent = class CreateWizardComponent {
    constructor(swalService, _matDialog, data, minimizeService, cdRef) {
        this.swalService = swalService;
        this._matDialog = _matDialog;
        this.data = data;
        this.minimizeService = minimizeService;
        this.cdRef = cdRef;
        this.formStepValid = false;
        this.currentStep = 1;
        this.steps = [];
        this.edit = false;
        this.className = '';
        this.model = data.model;
        this.modelFacade = data.modelFacade;
        this.scope = data.scope;
        this.edit = data.edit;
        this.values = data.values;
        this.formController = data.formController;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        if (!this.formController) {
            this.formController = new src_1.FormController(this.values ?? this.model, this.modelFacade, this.model);
        }
        this.className = this.formController.getClassName() ?? '';
        this.getSteps(Reflect.getMetadata(src_2.VISIBILITY_PREFIX_ALL, this.model));
        this.cdRef.detectChanges();
    }
    getSteps(fileFields) {
        for (let i = 0; i < fileFields.length; i++) {
            const field = Reflect.getMetadata(src_2.VISIBILITY_PREFIX, this.model, fileFields[i]);
            let currentStep = this.steps.find((step) => step.title === field.showModal);
            if (!currentStep) {
                currentStep = {
                    index: field.index,
                    arrayIndex: this.steps.length + 1,
                    title: field.showModal,
                    description: field.showDetail ?? '',
                    fields: [],
                };
                this.steps.push(currentStep);
            }
            currentStep.fields.push(fileFields[i]);
        }
    }
    nextStep() {
        if (this.currentStep !== this.steps.length) {
            this.stepperComponent.next();
            this.currentStep++;
        }
        this.formStepValid = false;
    }
    prevStep() {
        if (this.currentStep !== 0) {
            this.stepperComponent.previous();
            this.currentStep--;
        }
    }
    isValid() { }
    fireAction() {
        const form = this.formController.getForm().value;
        if (this.scope && this.scope.length > 0) {
            form[this.scope[0].key] = this.scope[0].value;
        }
        if (this.edit) {
            this.modelFacade.base.update(form);
            this._matDialog.closeAll();
        }
        else {
            this.modelFacade.base.add(form);
            this._matDialog.closeAll();
        }
    }
    onDismiss() {
        this.swalService.fireValidation().then((result) => {
            if (result.isConfirmed) {
                this._matDialog.closeAll();
                this.minimizeService.minimizeCurrentModal(Object.assign(Object.create(Object.getPrototypeOf(this)), this));
            }
            else if (result.isDenied) {
                this._matDialog.closeAll();
            }
            else if (result.isDismissed) {
            }
        });
    }
};
exports.CreateWizardComponent = CreateWizardComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], CreateWizardComponent.prototype, "model", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], CreateWizardComponent.prototype, "values", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], CreateWizardComponent.prototype, "state", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Function)
], CreateWizardComponent.prototype, "action", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], CreateWizardComponent.prototype, "edit", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", src_1.FormController)
], CreateWizardComponent.prototype, "formController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], CreateWizardComponent.prototype, "modelFacade", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Array)
], CreateWizardComponent.prototype, "scope", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)('horizontalStepper'),
    tslib_1.__metadata("design:type", stepper_1.MatStepper)
], CreateWizardComponent.prototype, "stepperComponent", void 0);
exports.CreateWizardComponent = CreateWizardComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'vosdellen-create-wizard',
        templateUrl: './create-wizard.component.html',
    }),
    tslib_1.__param(2, (0, core_1.Inject)(dialog_1.MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [swal_service_1.SwalService,
        dialog_1.MatDialog, Object, minimize_service_1.MinimizeService,
        core_1.ChangeDetectorRef])
], CreateWizardComponent);
//# sourceMappingURL=create-wizard.component.js.map