"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewDateComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const base_view_component_1 = require("../base-view/base-view.component");
const common_1 = require("@angular/common");
let ViewDateComponent = class ViewDateComponent extends base_view_component_1.BaseViewComponent {
    constructor(datePipe, cdRef) {
        super(cdRef);
        this.datePipe = datePipe;
        this.cdRef = cdRef;
    }
    ngOnInit() {
        super.ngOnInit();
        this._value = this.datePipe.transform(this._value, 'dd.MM.yyyy HH:mm');
    }
};
exports.ViewDateComponent = ViewDateComponent;
exports.ViewDateComponent = ViewDateComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'vosdellen-view-date',
        templateUrl: './view-date.component.html',
    }),
    tslib_1.__metadata("design:paramtypes", [common_1.DatePipe,
        core_1.ChangeDetectorRef])
], ViewDateComponent);
//# sourceMappingURL=view-date.component.js.map