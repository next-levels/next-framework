"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputDropdownComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_input_component_1 = require("./base-input.component");
let BaseInputDropdownComponent = class BaseInputDropdownComponent extends base_input_component_1.BaseInputComponent {
    constructor() {
        super(...arguments);
        this.options = [];
    }
    init() {
        if (this.formField.name) {
            const model = this.formController?.getModelDefinition();
            this.options = model?.dropdowns(this.formField?.name);
        }
    }
    logChange(event) {
        this.dataOutput.emit(event?.value);
    }
};
exports.BaseInputDropdownComponent = BaseInputDropdownComponent;
exports.BaseInputDropdownComponent = BaseInputDropdownComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-dropdown',
        template: '<ng-container ></ng-container>',
    })
], BaseInputDropdownComponent);
//# sourceMappingURL=base-input-dropdown.component.js.map