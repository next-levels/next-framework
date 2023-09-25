"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractStateComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let ContractStateComponent = class ContractStateComponent {
    constructor() { }
};
exports.ContractStateComponent = ContractStateComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], ContractStateComponent.prototype, "value", void 0);
exports.ContractStateComponent = ContractStateComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'vosdellen-contract-state',
        templateUrl: './contract-state.component.html',
        styleUrls: ['./contract-state.component.scss'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], ContractStateComponent);
//# sourceMappingURL=contract-state.component.js.map