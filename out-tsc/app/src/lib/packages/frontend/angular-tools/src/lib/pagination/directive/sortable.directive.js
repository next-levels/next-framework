"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgbdSortableHeader = exports.rotate = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
exports.rotate = {
    asc: 'desc',
    desc: '',
    '': 'asc',
};
let NgbdSortableHeader = class NgbdSortableHeader {
    constructor() {
        this.sortable = '';
        this.direction = '';
        this.sort = new core_1.EventEmitter();
    }
    rotate() {
        this.direction = exports.rotate[this.direction];
        this.sort.emit({ column: this.sortable, direction: this.direction });
    }
};
exports.NgbdSortableHeader = NgbdSortableHeader;
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", Object)
], NgbdSortableHeader.prototype, "sortable", void 0);
tslib_1.__decorate([
    (0, core_1.Input)(),
    tslib_1.__metadata("design:type", String)
], NgbdSortableHeader.prototype, "direction", void 0);
tslib_1.__decorate([
    (0, core_1.Output)(),
    tslib_1.__metadata("design:type", Object)
], NgbdSortableHeader.prototype, "sort", void 0);
exports.NgbdSortableHeader = NgbdSortableHeader = tslib_1.__decorate([
    (0, core_1.Directive)({
        selector: 'th[sortable]',
        host: {
            '[class.asc]': 'direction === "asc"',
            '[class.desc]': 'direction === "desc"',
            '(click)': 'rotate()',
        },
    })
], NgbdSortableHeader);
//# sourceMappingURL=sortable.directive.js.map