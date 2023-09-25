"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicModalsModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const create_wizard_component_1 = require("./components/create-wizard/create-wizard.component");
const core_2 = require("@ngx-translate/core");
const minimize_store_1 = require("./+state/minimize.store");
const store_1 = require("@ngrx/store");
const effects_1 = require("@ngrx/effects");
const minimize_effects_1 = require("./+state/minimize.effects");
const minimize_facade_1 = require("./+state/minimize.facade");
const minimize_service_1 = require("./services/minimize/minimize.service");
const swal_service_1 = require("./services/swal/swal.service");
const batch_wizard_component_1 = require("./components/batch-wizard/batch-wizard.component");
const stepper_1 = require("@angular/material/stepper");
const dialog_1 = require("@angular/material/dialog");
const icon_1 = require("@angular/material/icon");
const button_1 = require("@angular/material/button");
const transloco_1 = require("@ngneat/transloco");
const view_modal_component_1 = require("./components/view-modal/view-modal.component");
const table_1 = require("@angular/material/table");
const public_api_1 = require("../../../form-builder/public_api");
const store = new minimize_store_1.MinimizeStore();
let DynamicModalsModule = class DynamicModalsModule {
};
exports.DynamicModalsModule = DynamicModalsModule;
exports.DynamicModalsModule = DynamicModalsModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            create_wizard_component_1.CreateWizardComponent,
            batch_wizard_component_1.BatchWizardComponent,
            view_modal_component_1.ViewModalComponent,
        ],
        imports: [
            common_1.CommonModule,
            store_1.StoreModule.forFeature(store.featureKey, store.baseReducers),
            effects_1.EffectsModule.forFeature([minimize_effects_1.MinimizeEffects]),
            core_2.TranslateModule,
            stepper_1.MatStepperModule,
            dialog_1.MatDialogModule,
            icon_1.MatIconModule,
            button_1.MatButtonModule,
            transloco_1.TranslocoModule,
            public_api_1.FormBuilderModule,
            table_1.MatTableModule,
        ],
        exports: [create_wizard_component_1.CreateWizardComponent, batch_wizard_component_1.BatchWizardComponent, view_modal_component_1.ViewModalComponent],
        providers: [
            {
                provide: minimize_store_1.MinimizeStore,
                useValue: store,
            },
            minimize_facade_1.MinimizeFacade,
            minimize_service_1.MinimizeService,
            swal_service_1.SwalService,
        ],
    })
], DynamicModalsModule);
//# sourceMappingURL=dynamic-modals.module.js.map