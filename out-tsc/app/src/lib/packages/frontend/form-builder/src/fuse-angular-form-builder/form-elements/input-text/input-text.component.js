"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputTextComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const public_api_1 = require("../../../../public_api");
let InputTextComponent = class InputTextComponent extends public_api_1.BaseInputTextComponent {
};
exports.InputTextComponent = InputTextComponent;
exports.InputTextComponent = InputTextComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-text',
        templateUrl: './input-text.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    })
], InputTextComponent);
//# sourceMappingURL=input-text.component.js.map