"use strict";
var ListBuilderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBuilderModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const contract_state_component_1 = require("./components/view-items/contract-state/contract-state.component");
const table_default_component_1 = require("./components/table-default/table-default.component");
const table_submodule_component_1 = require("./components/table-submodule/table-submodule.component");
const view_currency_component_1 = require("./components/view-items/view-currency/view-currency.component");
const view_element_component_1 = require("./components/view-items/view-element/view-element.component");
const view_text_component_1 = require("./components/view-items/view-text/view-text.component");
const core_2 = require("@ngx-translate/core");
const sort_1 = require("@angular/material/sort");
const table_1 = require("@angular/material/table");
const paginator_1 = require("@angular/material/paginator");
const base_table_default_component_1 = require("./components/base-table-default/base-table-default.component");
const forms_1 = require("@angular/forms");
const button_1 = require("@angular/material/button");
const form_field_1 = require("@angular/material/form-field");
const icon_1 = require("@angular/material/icon");
const input_1 = require("@angular/material/input");
const transloco_1 = require("@ngneat/transloco");
const dialog_1 = require("@angular/material/dialog");
const base_list_component_1 = require("./components/base-list/base-list.component");
const view_relation_component_1 = require("./components/view-items/view-relation/view-relation.component");
const default_list_components_type_1 = require("./types/default-list-components.type");
const base_view_component_1 = require("./components/view-items/base-view/base-view.component");
const view_date_component_1 = require("./components/view-items/view-date/view-date.component");
const view_file_component_1 = require("./components/view-items/view-file/view-file.component");
const view_modal_component_1 = require("./components/view-modal/view-modal.component");
const view_dropdown_component_1 = require("./components/view-items/view-dropdown/view-dropdown.component");
const expansion_1 = require("@angular/material/expansion");
let ListBuilderModule = ListBuilderModule_1 = class ListBuilderModule {
    static forRoot(components = default_list_components_type_1.defaultListComponents, baseUrl = '') {
        return {
            ngModule: ListBuilderModule_1,
            providers: [
                { provide: 'listBuilderComponents', useValue: components },
                { provide: 'baseUrl', useValue: baseUrl },
                // Provide a default if no other provider is available.
                {
                    provide: 'listBuilderComponents',
                    useFactory: () => default_list_components_type_1.defaultListComponents,
                    deps: [],
                },
            ],
        };
    }
};
exports.ListBuilderModule = ListBuilderModule;
exports.ListBuilderModule = ListBuilderModule = ListBuilderModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({
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
    })
], ListBuilderModule);
//# sourceMappingURL=list-builder.module.js.map