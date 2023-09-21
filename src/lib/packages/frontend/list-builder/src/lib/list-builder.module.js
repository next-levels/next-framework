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
exports.ListBuilderModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var contract_state_component_1 = require("./components/view-items/contract-state/contract-state.component");
var table_default_component_1 = require("./components/table-default/table-default.component");
var table_submodule_component_1 = require("./components/table-submodule/table-submodule.component");
var view_currency_component_1 = require("./components/view-items/view-currency/view-currency.component");
var view_element_component_1 = require("./components/view-items/view-element/view-element.component");
var view_text_component_1 = require("./components/view-items/view-text/view-text.component");
var core_2 = require("@ngx-translate/core");
var sort_1 = require("@angular/material/sort");
var table_1 = require("@angular/material/table");
var paginator_1 = require("@angular/material/paginator");
var base_table_default_component_1 = require("./components/base-table-default/base-table-default.component");
var forms_1 = require("@angular/forms");
var button_1 = require("@angular/material/button");
var form_field_1 = require("@angular/material/form-field");
var icon_1 = require("@angular/material/icon");
var input_1 = require("@angular/material/input");
var transloco_1 = require("@ngneat/transloco");
var dialog_1 = require("@angular/material/dialog");
var base_list_component_1 = require("./components/base-list/base-list.component");
var view_relation_component_1 = require("./components/view-items/view-relation/view-relation.component");
var default_list_components_type_1 = require("./types/default-list-components.type");
var base_view_component_1 = require("./components/view-items/base-view/base-view.component");
var view_date_component_1 = require("./components/view-items/view-date/view-date.component");
var view_file_component_1 = require("./components/view-items/view-file/view-file.component");
var view_modal_component_1 = require("./components/view-modal/view-modal.component");
var view_dropdown_component_1 = require("./components/view-items/view-dropdown/view-dropdown.component");
var expansion_1 = require("@angular/material/expansion");
var ListBuilderModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
            imports: [
                common_1.CommonModule,
                core_2.TranslateModule,
                sort_1.MatSortModule,
                table_1.MatTableModule,
                paginator_1.MatPaginatorModule,
                forms_1.FormsModule,
                button_1.MatButtonModule,
                form_field_1.MatFormFieldModule,
                icon_1.MatIconModule,
                input_1.MatInputModule,
                transloco_1.TranslocoModule,
                forms_1.ReactiveFormsModule,
                dialog_1.MatDialogModule,
                common_1.DatePipe,
                common_1.NgOptimizedImage,
                expansion_1.MatExpansionModule,
            ],
            providers: [common_1.DatePipe],
            declarations: [
                contract_state_component_1.ContractStateComponent,
                table_default_component_1.TableDefaultComponent,
                table_submodule_component_1.TableSubmoduleComponent,
                contract_state_component_1.ContractStateComponent,
                view_currency_component_1.ViewCurrencyComponent,
                view_element_component_1.ViewElementComponent,
                view_text_component_1.ViewTextComponent,
                base_table_default_component_1.BaseTableDefaultComponent,
                base_list_component_1.BaseListComponent,
                base_view_component_1.BaseViewComponent,
                view_relation_component_1.ViewRelationComponent,
                view_date_component_1.ViewDateComponent,
                view_file_component_1.ViewFileComponent,
                view_modal_component_1.ViewModalComponent,
                view_dropdown_component_1.ViewDropdownComponent,
            ],
            exports: [
                contract_state_component_1.ContractStateComponent,
                table_default_component_1.TableDefaultComponent,
                table_submodule_component_1.TableSubmoduleComponent,
                contract_state_component_1.ContractStateComponent,
                view_currency_component_1.ViewCurrencyComponent,
                view_element_component_1.ViewElementComponent,
                view_text_component_1.ViewTextComponent,
                base_table_default_component_1.BaseTableDefaultComponent,
                base_list_component_1.BaseListComponent,
                base_view_component_1.BaseViewComponent,
                view_relation_component_1.ViewRelationComponent,
                view_date_component_1.ViewDateComponent,
                view_file_component_1.ViewFileComponent,
                view_dropdown_component_1.ViewDropdownComponent,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ListBuilderModule = _classThis = /** @class */ (function () {
        function ListBuilderModule_1() {
        }
        ListBuilderModule_1.forRoot = function (components, baseUrl) {
            if (components === void 0) { components = default_list_components_type_1.defaultListComponents; }
            if (baseUrl === void 0) { baseUrl = ''; }
            return {
                ngModule: ListBuilderModule,
                providers: [
                    { provide: 'listBuilderComponents', useValue: components },
                    { provide: 'baseUrl', useValue: baseUrl },
                    // Provide a default if no other provider is available.
                    {
                        provide: 'listBuilderComponents',
                        useFactory: function () { return default_list_components_type_1.defaultListComponents; },
                        deps: [],
                    },
                ],
            };
        };
        return ListBuilderModule_1;
    }());
    __setFunctionName(_classThis, "ListBuilderModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ListBuilderModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ListBuilderModule = _classThis;
}();
exports.ListBuilderModule = ListBuilderModule;
