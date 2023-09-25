"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInputTextComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_input_component_1 = require("./base-input.component");
const core_2 = require("@ngx-translate/core");
let BaseInputTextComponent = class BaseInputTextComponent extends base_input_component_1.BaseInputComponent {
    constructor(cdRef, translateService) {
        super(cdRef, translateService);
        this.cdRef = cdRef;
        this.translateService = translateService;
    }
};
exports.BaseInputTextComponent = BaseInputTextComponent;
exports.BaseInputTextComponent = BaseInputTextComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'nxt-input-text',
        template: '<ng-container ></ng-container>',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_2.TranslateService])
], BaseInputTextComponent);
//# sourceMappingURL=base-input-text.component.js.map