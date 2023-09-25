"use strict";
var FormBuilderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBuilderModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const form_element_component_1 = require("./components/form-element/form-element.component");
const forms_1 = require("@angular/forms");
const input_1 = require("@angular/material/input");
const datepicker_1 = require("@angular/material/datepicker");
const core_2 = require("@angular/material/core");
const autocomplete_1 = require("@angular/material/autocomplete");
const sort_1 = require("@angular/material/sort");
const paginator_1 = require("@angular/material/paginator");
const table_1 = require("@angular/material/table");
const router_1 = require("@angular/router");
const checkbox_1 = require("@angular/material/checkbox");
const select_1 = require("@angular/material/select");
const form_set_component_1 = require("./components/form-set/form-set.component");
const common_1 = require("@angular/common");
const ngx_quill_1 = require("ngx-quill");
const icon_1 = require("@angular/material/icon");
const button_1 = require("@angular/material/button");
const base_input_text_component_1 = require("./components/base-components/base-input-text.component");
const base_input_dropdown_component_1 = require("./components/base-components/base-input-dropdown.component");
const base_input_checkbox_component_1 = require("./components/base-components/base-input-checkbox.component");
const base_input_textarea_component_1 = require("./components/base-components/base-input-textarea.component");
const base_input_html_component_1 = require("./components/base-components/base-input-html.component");
const base_input_number_component_1 = require("./components/base-components/base-input-number.component");
const base_input_file_component_1 = require("./components/base-components/base-input-file.component");
const base_input_relation_dropdown_component_1 = require("./components/base-components/base-input-relation-dropdown.component");
const base_input_component_1 = require("./components/base-components/base-input.component");
let FormBuilderModule = FormBuilderModule_1 = class FormBuilderModule {
    static forRoot(components, baseUrl) {
        return {
            ngModule: FormBuilderModule_1,
            providers: [
                { provide: 'formBuilderComponents', useValue: components },
                { provide: 'baseUrl', useValue: baseUrl },
            ],
        };
    }
};
exports.FormBuilderModule = FormBuilderModule;
exports.FormBuilderModule = FormBuilderModule = FormBuilderModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            router_1.RouterModule,
            input_1.MatInputModule,
            datepicker_1.MatDatepickerModule,
            core_2.MatNativeDateModule,
            autocomplete_1.MatAutocompleteModule,
            sort_1.MatSortModule,
            paginator_1.MatPaginatorModule,
            table_1.MatTableModule,
            checkbox_1.MatCheckboxModule,
            select_1.MatSelectModule,
            input_1.MatInputModule,
            ngx_quill_1.QuillEditorComponent,
            icon_1.MatIconModule,
            button_1.MatButtonModule,
        ],
        exports: [form_element_component_1.FormElementComponent, form_element_component_1.FormElementComponent, form_set_component_1.FormSetComponent],
        declarations: [
            form_element_component_1.FormElementComponent,
            base_input_component_1.BaseInputComponent,
            base_input_text_component_1.BaseInputTextComponent,
            base_input_dropdown_component_1.BaseInputDropdownComponent,
            base_input_checkbox_component_1.BaseInputCheckboxComponent,
            base_input_textarea_component_1.BaseInputTextareaComponent,
            form_set_component_1.FormSetComponent,
            base_input_html_component_1.BaseInputHtmlComponent,
            base_input_number_component_1.BaseInputNumberComponent,
            base_input_file_component_1.BaseInputFileComponent,
            base_input_relation_dropdown_component_1.BaseInputRelationDropdownComponent,
        ],
    })
], FormBuilderModule);
//# sourceMappingURL=form-builder.module.js.map