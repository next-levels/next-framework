"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseViewComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const ListController_1 = require("../../../controllers/ListController");
let BaseViewComponent = class BaseViewComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.detailView = false;
    }
    ngOnInit() {
        this._value = this.viewObject[this.fieldName];
    }
};
exports.BaseViewComponent = BaseViewComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], BaseViewComponent.prototype, "fieldName", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", ListController_1.ListController)
], BaseViewComponent.prototype, "listController", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseViewComponent.prototype, "viewObject", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseViewComponent.prototype, "detailView", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], BaseViewComponent.prototype, "listField", void 0);
exports.BaseViewComponent = BaseViewComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        template: '<ng-container ></ng-container>',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    }),
    tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], BaseViewComponent);
//# sourceMappingURL=base-view.component.js.map