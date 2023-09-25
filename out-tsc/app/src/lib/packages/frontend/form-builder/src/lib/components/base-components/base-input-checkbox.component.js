"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputCheckboxComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_input_component_1 = require("./base-input.component");
let BaseInputCheckboxComponent = class BaseInputCheckboxComponent extends base_input_component_1.BaseInputComponent {
    onEventChange(event) {
        if (event.value) {
            this.dataOutput.emit(event.value.toISOString());
        }
    }
};
exports.BaseInputCheckboxComponent = BaseInputCheckboxComponent;
exports.BaseInputCheckboxComponent = BaseInputCheckboxComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-checkbox',
        template: '<ng-container ></ng-container>',
    })
], BaseInputCheckboxComponent);
//# sourceMappingURL=base-input-checkbox.component.js.map