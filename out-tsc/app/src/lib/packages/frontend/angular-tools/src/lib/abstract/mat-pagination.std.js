"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatPaginationStd = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const paginator_1 = require("@angular/material/paginator");
const sort_1 = require("@angular/material/sort");
const table_1 = require("@angular/material/table");
let MatPaginationStd = class MatPaginationStd {
    constructor() {
        this.dataSource = new table_1.MatTableDataSource([]);
        this.pagination = {
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 0,
            totalItems: 0,
            sortBy: [['id', 'DESC']],
        };
        this.filterOptions = {
            page: this.pagination.currentPage,
            limit: this.pagination.itemsPerPage,
            sortBy: `${this.pagination.sortBy[0][0]}:${this.pagination.sortBy[0][1].toUpperCase()}`,
            search: '',
        };
    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index, item) {
        return item.id || index;
    }
};
exports.MatPaginationStd = MatPaginationStd;
tslib_1.__decorate([
    (0, core_1.ViewChild)(paginator_1.MatPaginator),
    tslib_1.__metadata("design:type", paginator_1.MatPaginator)
], MatPaginationStd.prototype, "paginator", void 0);
tslib_1.__decorate([
    (0, core_1.ViewChild)(sort_1.MatSort),
    tslib_1.__metadata("design:type", sort_1.MatSort)
], MatPaginationStd.prototype, "sort", void 0);
exports.MatPaginationStd = MatPaginationStd = tslib_1.__decorate([
    (0, core_1.Component)({ templateUrl: 'mat-pagination.std.html' })
], MatPaginationStd);
//# sourceMappingURL=mat-pagination.std.js.map