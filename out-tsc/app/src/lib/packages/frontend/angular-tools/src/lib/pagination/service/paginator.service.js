"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatorService = void 0;
const tslib_1 = require("tslib");
const rxjs_1 = require("rxjs");
const core_1 = require("@angular/core");
let PaginatorService = class PaginatorService {
    constructor() {
        this._total$ = new rxjs_1.BehaviorSubject(0);
        this._entities$ = new rxjs_1.BehaviorSubject([]);
        this._loading$ = new rxjs_1.BehaviorSubject(true);
    }
    get total$() {
        return this._total$;
    }
    set total$(value) {
        this._total$ = value;
    }
    get entities$() {
        return this._entities$;
    }
    set entities$(value) {
        this._entities$ = value;
    }
    get loading$() {
        return this._loading$;
    }
    set loading$(value) {
        this._loading$ = value;
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
    }
};
exports.PaginatorService = PaginatorService;
exports.PaginatorService = PaginatorService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    })
], PaginatorService);
//# sourceMappingURL=paginator.service.js.map