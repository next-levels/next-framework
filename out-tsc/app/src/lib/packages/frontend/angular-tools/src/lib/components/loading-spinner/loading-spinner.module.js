"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingSpinnerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const loading_spinner_component_1 = require("./loading-spinner.component");
let LoadingSpinnerModule = class LoadingSpinnerModule {
};
exports.LoadingSpinnerModule = LoadingSpinnerModule;
exports.LoadingSpinnerModule = LoadingSpinnerModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [common_1.CommonModule],
        declarations: [loading_spinner_component_1.LoadingSpinnerComponent],
        exports: [loading_spinner_component_1.LoadingSpinnerComponent],
    })
], LoadingSpinnerModule);
//# sourceMappingURL=loading-spinner.module.js.map