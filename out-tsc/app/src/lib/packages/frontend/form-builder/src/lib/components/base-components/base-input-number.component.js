"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputNumberComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_input_component_1 = require("./base-input.component");
let BaseInputNumberComponent = class BaseInputNumberComponent extends base_input_component_1.BaseInputComponent {
    onEventChange(event) {
        if (event.value) {
            this.dataOutput.emit(event.value.toISOString());
        }
    }
};
exports.BaseInputNumberComponent = BaseInputNumberComponent;
exports.BaseInputNumberComponent = BaseInputNumberComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-number',
        template: '<ng-container ></ng-container>',
    })
], BaseInputNumberComponent);
//# sourceMappingURL=base-input-number.component.js.map