"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputTextareaComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_input_component_1 = require("./base-input.component");
let BaseInputTextareaComponent = class BaseInputTextareaComponent extends base_input_component_1.BaseInputComponent {
    onEventChange(event) {
        if (event.value) {
            this.dataOutput.emit(event.value.toISOString());
        }
    }
};
exports.BaseInputTextareaComponent = BaseInputTextareaComponent;
exports.BaseInputTextareaComponent = BaseInputTextareaComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-textarea',
        template: '<ng-container ></ng-container>',
    })
], BaseInputTextareaComponent);
//# sourceMappingURL=base-input-textarea.component.js.map