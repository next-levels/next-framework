"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractModule = exports.MatPaginationStd = exports.PaginationPart = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const mat_pagination_std_1 = require("./mat-pagination.std");
var pagination_part_1 = require("./pagination.part");
Object.defineProperty(exports, "PaginationPart", { enumerable: true, get: function () { return pagination_part_1.PaginationPart; } });
var mat_pagination_std_2 = require("./mat-pagination.std");
Object.defineProperty(exports, "MatPaginationStd", { enumerable: true, get: function () { return mat_pagination_std_2.MatPaginationStd; } });
let AbstractModule = class AbstractModule {
};
exports.AbstractModule = AbstractModule;
exports.AbstractModule = AbstractModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        imports: [common_1.CommonModule],
        declarations: [mat_pagination_std_1.MatPaginationStd],
    })
], AbstractModule);
//# sourceMappingURL=abstract.module.js.map