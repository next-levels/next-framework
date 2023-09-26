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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IonicFormBuilderModule = void 0;
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var core_2 = require("@ngx-translate/core");
var ngx_quill_1 = require("ngx-quill");
var input_text_component_1 = require("./form-elements/input-text/input-text.component");
var input_textarea_component_1 = require("./form-elements/input-textarea/input-textarea.component");
var input_dropdown_component_1 = require("./form-elements/input-dropdown/input-dropdown.component");
var input_html_component_1 = require("./form-elements/input-html/input-html.component");
var input_number_component_1 = require("./form-elements/input-number/input-number.component");
var input_relation_dropdown_component_1 = require("./form-elements/input-relation-dropdown/input-relation-dropdown.component");
var input_file_component_1 = require("./form-elements/input-file/input-file.component");
var angular_1 = require("@ionic/angular");
var select_1 = require("@angular/material/select");
var input_date_component_1 = require("./form-elements/input-date/input-date.component");
var input_sign_component_1 = require("./form-elements/input-sign/input-sign.component");
var form_field_1 = require("@angular/material/form-field");
var input_dropdown_radio_component_1 = require("./form-elements/input-dropdown-radio/input-dropdown-radio.component");
var form_builder_module_1 = require("../lib/form-builder.module");
var IonicFormBuilderModule = function () {
    var _classDecorators = [(0, core_1.NgModule)({
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
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var IonicFormBuilderModule = _classThis = /** @class */ (function () {
        function IonicFormBuilderModule_1() {
        }
        IonicFormBuilderModule_1.forRoot = function (baseUri) {
            return {
                ngModule: IonicFormBuilderModule,
                providers: __spreadArray([
                    {
                        provide: 'baseUrl',
                        useValue: baseUri,
                    }
                ], form_builder_module_1.FormBuilderModule.forRoot({
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
                }, baseUri).providers, true),
            };
        };
        return IonicFormBuilderModule_1;
    }());
    __setFunctionName(_classThis, "IonicFormBuilderModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IonicFormBuilderModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IonicFormBuilderModule = _classThis;
}();
exports.IonicFormBuilderModule = IonicFormBuilderModule;