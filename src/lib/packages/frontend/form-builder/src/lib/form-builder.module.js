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
exports.FormBuilderModule = void 0;
var core_1 = require("@angular/core");
var form_element_component_1 = require("./components/form-element/form-element.component");
var forms_1 = require("@angular/forms");
var input_1 = require("@angular/material/input");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var autocomplete_1 = require("@angular/material/autocomplete");
var sort_1 = require("@angular/material/sort");
var paginator_1 = require("@angular/material/paginator");
var table_1 = require("@angular/material/table");
var router_1 = require("@angular/router");
var checkbox_1 = require("@angular/material/checkbox");
var select_1 = require("@angular/material/select");
var form_set_component_1 = require("./components/form-set/form-set.component");
var common_1 = require("@angular/common");
var ngx_quill_1 = require("ngx-quill");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var base_input_text_component_1 = require("./components/base-components/base-input-text.component");
var base_input_dropdown_component_1 = require("./components/base-components/base-input-dropdown.component");
var base_input_checkbox_component_1 = require("./components/base-components/base-input-checkbox.component");
var base_input_textarea_component_1 = require("./components/base-components/base-input-textarea.component");
var base_input_html_component_1 = require("./components/base-components/base-input-html.component");
var base_input_number_component_1 = require("./components/base-components/base-input-number.component");
var base_input_file_component_1 = require("./components/base-components/base-input-file.component");
var base_input_relation_dropdown_component_1 = require("./components/base-components/base-input-relation-dropdown.component");
var base_input_component_1 = require("./components/base-components/base-input.component");
var FormBuilderModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
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
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var FormBuilderModule = _classThis = /** @class */ (function () {
        function FormBuilderModule_1() {
        }
        FormBuilderModule_1.forRoot = function (components, baseUrl) {
            return {
                ngModule: FormBuilderModule,
                providers: [
                    { provide: 'formBuilderComponents', useValue: components },
                    { provide: 'baseUrl', useValue: baseUrl },
                ],
            };
        };
        return FormBuilderModule_1;
    }());
    __setFunctionName(_classThis, "FormBuilderModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FormBuilderModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FormBuilderModule = _classThis;
}();
exports.FormBuilderModule = FormBuilderModule;
