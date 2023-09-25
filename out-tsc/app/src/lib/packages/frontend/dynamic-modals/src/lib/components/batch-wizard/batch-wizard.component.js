"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchWizardComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const swal_service_1 = require("../../services/swal/swal.service");
const socket_io_client_1 = require("socket.io-client");
require("reflect-metadata");
const minimize_service_1 = require("../../services/minimize/minimize.service");
const ngx_progressbar_1 = require("ngx-progressbar");
const dialog_1 = require("@angular/material/dialog");
const src_1 = require("../../../../../form-builder/src");
const src_2 = require("../../../../../../shared/generics/src");
let BatchWizardComponent = class BatchWizardComponent {
    constructor(swalService, _matDialog, minimizeService, progress) {
        this.swalService = swalService;
        this._matDialog = _matDialog;
        this.minimizeService = minimizeService;
        this.progress = progress;
        this.formStepValid = false;
        this.currentStep = 1;
        this.steps = [];
        this.edit = false;
        this.className = '';
        this.progressRef = progress.ref('progress-header');
    }
    ngOnInit() {
        this.socket = (0, socket_io_client_1.io)('/batch');
        this.socket.on('batch', (progressCount) => {
            if (progressCount === 100) {
                this.progressRef.complete();
                this._matDialog.closeAll();
            }
            this.progressRef.set(progressCount);
        });
    }
    ngAfterViewInit() {
        if (!this.formController) {
            this.formController = new src_1.FormController(this.values ?? this.model, this.state, this.model);
        }
        this.className = this.formController.getClassName() ?? '';
        this.getSteps(Reflect.getMetadata(src_2.VISIBILITY_PREFIX_ALL, this.model));
    }
    getSteps(fileFields) {
        let currentStep = {
            index: 1,
            arrayIndex: this.steps.length + 1,
            title: 'General',
            description: '',
            fields: [],
        };
        for (let i = 0; i < fileFields.length; i++) {
            const field = Reflect.getMetadata(src_2.VISIBILITY_PREFIX, this.model, fileFields[i]);
            currentStep.fields.push(fileFields[i]);
        }
        this.steps.push(currentStep);
    }
    nextStep() {
        if (this.currentStep !== this.steps.length)
            this.currentStep++;
        this.formStepValid = false;
    }
    prevStep() {
        if (this.currentStep !== 0)
            this.currentStep--;
    }
    fireAction() {
        const form = this.formController.getForm().value;
        if (this.scope) {
            form[this.scope.key] = this.scope.value;
        }
        if ('batchEdit' in this.modelFacade) {
            const cleanForm = src_2.UTIL.removeNullProperties(form);
            let ids = this.values.map((obj) => obj.id);
            this.progressRef.start();
            this.modelFacade.batchEdit(ids, cleanForm);
        }
        else {
            console.log('modelFacade does not have method "batchEdit"');
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
exports.BatchWizardComponent = BatchWizardComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BatchWizardComponent.prototype, "model", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BatchWizardComponent.prototype, "values", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BatchWizardComponent.prototype, "state", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Function)
], BatchWizardComponent.prototype, "action", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BatchWizardComponent.prototype, "edit", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", src_1.FormController)
], BatchWizardComponent.prototype, "formController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BatchWizardComponent.prototype, "modelFacade", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BatchWizardComponent.prototype, "scope", void 0);
exports.BatchWizardComponent = BatchWizardComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'vosdellen-batch-wizard',
        templateUrl: './batch-wizard.component.html',
    }),
    tslib_1.__metadata("design:paramtypes", [swal_service_1.SwalService,
        dialog_1.MatDialog,
        minimize_service_1.MinimizeService,
        ngx_progressbar_1.NgProgress])
], BatchWizardComponent);
//# sourceMappingURL=batch-wizard.component.js.map