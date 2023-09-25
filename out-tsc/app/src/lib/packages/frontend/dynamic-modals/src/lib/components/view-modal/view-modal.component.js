"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModalComponent = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const core_1 = require("@angular/core");
const swal_service_1 = require("../../services/swal/swal.service");
const minimize_service_1 = require("../../services/minimize/minimize.service");
const dialog_1 = require("@angular/material/dialog");
const stepper_1 = require("@angular/material/stepper");
const core_2 = require("@ngx-translate/core");
const src_1 = require("../../../../../form-builder/src");
const src_2 = require("../../../../../../shared/generics/src");
const src_3 = require("../../../../../list-builder/src");
let ViewModalComponent = class ViewModalComponent {
    constructor(swalService, _matDialog, data, minimizeService, translateService, cdRef) {
        this.swalService = swalService;
        this._matDialog = _matDialog;
        this.data = data;
        this.minimizeService = minimizeService;
        this.translateService = translateService;
        this.cdRef = cdRef;
        this.formStepValid = false;
        this.currentStep = 1;
        this.steps = [];
        this.edit = false;
        this._fields = [];
        this.className = '';
        this.model = data.model;
        this.modelFacade = data.modelFacade;
        this.edit = data.edit;
        this.values = data.values;
        this.formController = data.formController;
    }
    ngOnInit() { }
    ngAfterViewInit() {
        if (!this.listController) {
            this.listController = new src_3.ListController(this.values ?? this.model, this.modelFacade, this.model);
        }
        this.className = this.listController.getClassName() ?? '';
        this._fields = Reflect.getMetadata(src_2.VISIBILITY_PREFIX_ALL, this.model);
        this.cdRef.detectChanges();
    }
    getSettingsField(field) {
        return Reflect.getMetadata(src_2.BUILDERFIELD_PREFIX, this.model, field);
    }
    close() {
        this._matDialog.closeAll();
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
exports.ViewModalComponent = ViewModalComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewModalComponent.prototype, "model", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewModalComponent.prototype, "values", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewModalComponent.prototype, "state", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Function)
], ViewModalComponent.prototype, "action", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewModalComponent.prototype, "edit", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", src_1.FormController)
], ViewModalComponent.prototype, "formController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], ViewModalComponent.prototype, "modelFacade", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Array)
], ViewModalComponent.prototype, "scope", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)('horizontalStepper'),
    tslib_1.__metadata("design:type", stepper_1.MatStepper)
], ViewModalComponent.prototype, "stepperComponent", void 0);
exports.ViewModalComponent = ViewModalComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'view-modal',
        templateUrl: './view-modal.component.html',
    }),
    tslib_1.__param(2, (0, core_1.Inject)(dialog_1.MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [swal_service_1.SwalService,
        dialog_1.MatDialog, Object, minimize_service_1.MinimizeService,
        core_2.TranslateService,
        core_1.ChangeDetectorRef])
], ViewModalComponent);
//# sourceMappingURL=view-modal.component.js.map