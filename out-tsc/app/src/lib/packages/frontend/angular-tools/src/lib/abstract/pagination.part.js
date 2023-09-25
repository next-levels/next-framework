"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPart = void 0;
class PaginationPart {
    get items$() {
        return this._items$;
    }
    set items$(value) {
        this._items$ = value;
    }
    query(sort = 'asc') {
        this.queryAction();
    }
    openModal(item) {
        this.openModalAction(item);
    }
}
exports.PaginationPart = PaginationPart;
//# sourceMappingURL=pagination.part.js.map