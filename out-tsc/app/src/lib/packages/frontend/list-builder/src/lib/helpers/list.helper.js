"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterOptions = void 0;
function getFilterOptions(pagination) {
    return {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        sortBy: `${pagination.sortBy[0][0]}:${pagination.sortBy[0][1].toUpperCase()}`,
        search: '',
    };
}
exports.getFilterOptions = getFilterOptions;
//# sourceMappingURL=list.helper.js.map