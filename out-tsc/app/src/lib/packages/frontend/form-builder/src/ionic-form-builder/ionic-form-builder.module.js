"use strict";
var IonicFormBuilderModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IonicFormBuilderModule = void 0;
const tslib_1 = require("tslib");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const core_2 = require("@ngx-translate/core");
const ngx_quill_1 = require("ngx-quill");
const input_text_component_1 = require("./form-elements/input-text/input-text.component");
const input_textarea_component_1 = require("./form-elements/input-textarea/input-textarea.component");
const input_dropdown_component_1 = require("./form-elements/input-dropdown/input-dropdown.component");
const input_html_component_1 = require("./form-elements/input-html/input-html.component");
const input_number_component_1 = require("./form-elements/input-number/input-number.component");
const input_relation_dropdown_component_1 = require("./form-elements/input-relation-dropdown/input-relation-dropdown.component");
const input_file_component_1 = require("./form-elements/input-file/input-file.component");
const angular_1 = require("@ionic/angular");
const select_1 = require("@angular/material/select");
const input_date_component_1 = require("./form-elements/input-date/input-date.component");
const input_sign_component_1 = require("./form-elements/input-sign/input-sign.component");
const form_field_1 = require("@angular/material/form-field");
const input_dropdown_radio_component_1 = require("./form-elements/input-dropdown-radio/input-dropdown-radio.component");
const form_builder_module_1 = require("../lib/form-builder.module");
let IonicFormBuilderModule = IonicFormBuilderModule_1 = class IonicFormBuilderModule {
    static forRoot(baseUri) {
        return {
            ngModule: IonicFormBuilderModule_1,
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
                    RADIO: input_dropdown_radio_component_1.InputDropdownRadioComponent,
                    HTML: input_html_component_1.InputHtmlComponent,
                    DATE: input_date_component_1.InputDateComponent,
                    NUMBER: input_number_component_1.InputNumberComponent,
                    CHECKBOX: input_text_component_1.InputTextComponent,
                    RELATION: input_relation_dropdown_component_1.InputRelationDropdownComponent,
                    FILE: input_file_component_1.InputFileComponent,
                    SIGN: input_sign_component_1.InputSignComponent,
                }, baseUri).providers,
            ],
        };
    }
};
exports.IonicFormBuilderModule = IonicFormBuilderModule;
exports.IonicFormBuilderModule = IonicFormBuilderModule = IonicFormBuilderModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [
            forms_1.ReactiveFormsModule,
            common_1.CommonModule,
            router_1.RouterModule,
            core_2.TranslateModule,
            ngx_quill_1.QuillEditorComponent,
            angular_1.IonicModule,
            select_1.MatSelectModule,
            form_field_1.MatFormFieldModule,
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
            input_date_component_1.InputDateComponent,
            input_sign_component_1.InputSignComponent,
            input_dropdown_radio_component_1.InputDropdownRadioComponent,
        ],
    })
], IonicFormBuilderModule);
//# sourceMappingURL=ionic-form-builder.module.js.map