"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingSpinnerComponent = void 0;
const tslib_1 = require("tslib");
const animations_1 = require("@angular/animations");
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
let LoadingSpinnerComponent = class LoadingSpinnerComponent {
};
exports.LoadingSpinnerComponent = LoadingSpinnerComponent;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", rxjs_1.Observable)
], LoadingSpinnerComponent.prototype, "loading$", void 0);
exports.LoadingSpinnerComponent = LoadingSpinnerComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: 'vosdellen-loading-spinner',
        templateUrl: './loading-spinner.component.html',
        styleUrls: ['./loading-spinner.component.scss'],
        animations: [
            (0, animations_1.trigger)('inOutAnimation', [
                (0, animations_1.transition)(':enter', [
                    (0, animations_1.style)({ opacity: 0 }),
                    (0, animations_1.animate)('300ms ease-out', (0, animations_1.style)({ opacity: 1 })),
                ]),
                (0, animations_1.transition)(':leave', [
                    (0, animations_1.style)({ opacity: 1 }),
                    (0, animations_1.animate)('300ms ease-in', (0, animations_1.style)({ opacity: 0 })),
                ]),
            ]),
        ],
    })
], LoadingSpinnerComponent);
//# sourceMappingURL=loading-spinner.component.js.map