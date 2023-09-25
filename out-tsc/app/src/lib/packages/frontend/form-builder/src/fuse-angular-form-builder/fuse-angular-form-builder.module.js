"use strict";
var FuseAngularFormBuilderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuseAngularFormBuilderModule = void 0;
const tslib_1 = require("tslib");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const core_2 = require("@ngx-translate/core");
const input_1 = require("@angular/material/input");
const datepicker_1 = require("@angular/material/datepicker");
const core_3 = require("@angular/material/core");
const autocomplete_1 = require("@angular/material/autocomplete");
const sort_1 = require("@angular/material/sort");
const paginator_1 = require("@angular/material/paginator");
const table_1 = require("@angular/material/table");
const checkbox_1 = require("@angular/material/checkbox");
const select_1 = require("@angular/material/select");
const ngx_quill_1 = require("ngx-quill");
const icon_1 = require("@angular/material/icon");
const button_1 = require("@angular/material/button");
const input_text_component_1 = require("./form-elements/input-text/input-text.component");
const input_textarea_component_1 = require("./form-elements/input-textarea/input-textarea.component");
const input_dropdown_component_1 = require("./form-elements/input-dropdown/input-dropdown.component");
const input_html_component_1 = require("./form-elements/input-html/input-html.component");
const input_number_component_1 = require("./form-elements/input-number/input-number.component");
const input_relation_dropdown_component_1 = require("./form-elements/input-relation-dropdown/input-relation-dropdown.component");
const input_file_component_1 = require("./form-elements/input-file/input-file.component");
const input_checkbox_component_1 = require("./form-elements/input-checkbox/input-checkbox.component");
const input_date_component_1 = require("./form-elements/input-date/input-date.component");
const form_builder_module_1 = require("../lib/form-builder.module");
let FuseAngularFormBuilderModule = FuseAngularFormBuilderModule_1 = class FuseAngularFormBuilderModule {
    static forRoot(baseUri) {
        return {
            ngModule: FuseAngularFormBuilderModule_1,
            providers: [
                {
                    provide: 'baseUrl',
                    useValue: baseUri,
                },
                ...form_builder_module_1.FormBuilderModule.forRoot({
                    HIDDEN: input_textarea_component_1.InputTextareaComponent,
                    TEXT: input_text_component_1.InputTextComponent,
                    CURRENCY: input_text_component_1.InputTextComponent,
                    TEXTAREA: input_textarea_component_1.InputTextareaComponent,
                    DROPDOWN: input_dropdown_component_1.InputDropdownComponent,
                    RADIO: input_dropdown_component_1.InputDropdownComponent,
                    HTML: input_html_component_1.InputHtmlComponent,
                    DATE: input_date_component_1.InputDateComponent,
                    NUMBER: input_number_component_1.InputNumberComponent,
                    CHECKBOX: input_text_component_1.InputTextComponent,
                    RELATION: input_relation_dropdown_component_1.InputRelationDropdownComponent,
                    FILE: input_file_component_1.InputFileComponent,
                    SIGN: input_file_component_1.InputFileComponent,
                }, baseUri).providers,
            ],
        };
    }
};
exports.FuseAngularFormBuilderModule = FuseAngularFormBuilderModule;
exports.FuseAngularFormBuilderModule = FuseAngularFormBuilderModule = FuseAngularFormBuilderModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            router_1.RouterModule,
            core_2.TranslateModule,
            input_1.MatInputModule,
            datepicker_1.MatDatepickerModule,
            core_3.MatNativeDateModule,
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
            core_3.MatRippleModule,
        ],
        exports: [],
        declarations: [
            input_text_component_1.InputTextComponent,
            input_textarea_component_1.InputTextareaComponent,
            input_dropdown_component_1.InputDropdownComponent,
            input_html_component_1.InputHtmlComponent,
            input_number_component_1.InputNumberComponent,
            input_relation_dropdown_component_1.InputRelationDropdownComponent,
            input_file_component_1.InputFileComponent,
            input_checkbox_component_1.InputCheckboxComponent,
            input_date_component_1.InputDateComponent,
        ],
    })
], FuseAngularFormBuilderModule);
//# sourceMappingURL=fuse-angular-form-builder.module.js.map