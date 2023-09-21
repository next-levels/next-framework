"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultListComponents = void 0;
var view_relation_component_1 = require("../components/view-items/view-relation/view-relation.component");
var view_text_component_1 = require("../components/view-items/view-text/view-text.component");
var view_currency_component_1 = require("../components/view-items/view-currency/view-currency.component");
var view_date_component_1 = require("../components/view-items/view-date/view-date.component");
var view_file_component_1 = require("../components/view-items/view-file/view-file.component");
var view_dropdown_component_1 = require("../components/view-items/view-dropdown/view-dropdown.component");
exports.defaultListComponents = {
    HIDDEN: view_text_component_1.ViewTextComponent,
    TEXT: view_text_component_1.ViewTextComponent,
    CURRENCY: view_currency_component_1.ViewCurrencyComponent,
    TEXTAREA: view_text_component_1.ViewTextComponent,
    DROPDOWN: view_dropdown_component_1.ViewDropdownComponent,
    RADIO: view_dropdown_component_1.ViewDropdownComponent,
    HTML: view_text_component_1.ViewTextComponent,
    DATE: view_date_component_1.ViewDateComponent,
    NUMBER: view_text_component_1.ViewTextComponent,
    CHECKBOX: view_text_component_1.ViewTextComponent,
    RELATION: view_relation_component_1.ViewRelationComponent,
    FILE: view_file_component_1.ViewFileComponent,
    SIGN: view_file_component_1.ViewFileComponent,
};
