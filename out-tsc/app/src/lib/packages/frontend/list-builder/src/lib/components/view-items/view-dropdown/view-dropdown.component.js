"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewDropdownComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_view_component_1 = require("../base-view/base-view.component");
let ViewDropdownComponent = class ViewDropdownComponent extends base_view_component_1.BaseViewComponent {
    ngOnInit() {
        this._value = this.viewObject[this.fieldName];
        let mapValues = this.listController
            .getModelDefinition()
            .dropdowns(this.fieldName);
        this._value = mapValues.find((obj) => obj.value === this._value)?.label;
    }
};
exports.ViewDropdownComponent = ViewDropdownComponent;
exports.ViewDropdownComponent = ViewDropdownComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'view-dropdown-text',
        templateUrl: './view-dropdown.component.html',
    })
], ViewDropdownComponent);
//# sourceMappingURL=view-dropdown.component.js.map