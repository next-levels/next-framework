"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwalService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const sweetalert2_1 = require("sweetalert2");
let SwalService = class SwalService {
    constructor() { }
    fireSuccess(options) {
        sweetalert2_1.default.fire({
            title: options.title,
            text: options.text,
            icon: 'success',
        });
    }
    fireValidation() {
        return sweetalert2_1.default.fire({
            title: 'Möchtest du deine Änderungen speichern?',
            icon: 'question',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'Abbrechen',
            confirmButtonText: 'Speichern',
            denyButtonText: `Nicht speichern`,
        });
    }
};
exports.SwalService = SwalService;
exports.SwalService = SwalService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    }),
    tslib_1.__metadata("design:paramtypes", [])
], SwalService);
//# sourceMappingURL=swal.service.js.map