"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicModalsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var create_wizard_component_1 = require("./components/create-wizard/create-wizard.component");
var core_2 = require("@ngx-translate/core");
var minimize_store_1 = require("./+state/minimize.store");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var minimize_effects_1 = require("./+state/minimize.effects");
var minimize_facade_1 = require("./+state/minimize.facade");
var minimize_service_1 = require("./services/minimize/minimize.service");
var swal_service_1 = require("./services/swal/swal.service");
var batch_wizard_component_1 = require("./components/batch-wizard/batch-wizard.component");
var stepper_1 = require("@angular/material/stepper");
var dialog_1 = require("@angular/material/dialog");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var transloco_1 = require("@ngneat/transloco");
var view_modal_component_1 = require("./components/view-modal/view-modal.component");
var table_1 = require("@angular/material/table");
var public_api_1 = require("../../../form-builder/public_api");
var store = new minimize_store_1.MinimizeStore();
var DynamicModalsModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
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
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var DynamicModalsModule = _classThis = /** @class */ (function () {
        function DynamicModalsModule_1() {
        }
        return DynamicModalsModule_1;
    }());
    __setFunctionName(_classThis, "DynamicModalsModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DynamicModalsModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DynamicModalsModule = _classThis;
}();
exports.DynamicModalsModule = DynamicModalsModule;
