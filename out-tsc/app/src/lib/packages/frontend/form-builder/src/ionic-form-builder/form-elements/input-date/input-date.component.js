"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputDateComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const core_2 = require("@ngx-translate/core");
const public_api_1 = require("../../../../public_api");
let InputDateComponent = class InputDateComponent extends public_api_1.BaseInputTextComponent {
    constructor(cdRef, translateService) {
        super(cdRef, translateService);
        this.cdRef = cdRef;
        this.translateService = translateService;
    }
};
exports.InputDateComponent = InputDateComponent;
exports.InputDateComponent = InputDateComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-date',
        templateUrl: './input-date.component.html',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_2.TranslateService])
], InputDateComponent);
//# sourceMappingURL=input-date.component.js.map