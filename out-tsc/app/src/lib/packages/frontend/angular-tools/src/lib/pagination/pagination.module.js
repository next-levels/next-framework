"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationModule = exports.rotate = exports.NgbdSortableHeader = exports.PaginatorService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const sortable_directive_1 = require("./directive/sortable.directive");
var paginator_service_1 = require("./service/paginator.service");
Object.defineProperty(exports, "PaginatorService", { enumerable: true, get: function () { return paginator_service_1.PaginatorService; } });
var sortable_directive_2 = require("./directive/sortable.directive");
Object.defineProperty(exports, "NgbdSortableHeader", { enumerable: true, get: function () { return sortable_directive_2.NgbdSortableHeader; } });
Object.defineProperty(exports, "rotate", { enumerable: true, get: function () { return sortable_directive_2.rotate; } });
let PaginationModule = class PaginationModule {
};
exports.PaginationModule = PaginationModule;
exports.PaginationModule = PaginationModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [sortable_directive_1.NgbdSortableHeader],
        exports: [sortable_directive_1.NgbdSortableHeader],
    })
], PaginationModule);
//# sourceMappingURL=pagination.module.js.map