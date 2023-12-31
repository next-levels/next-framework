"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterClause = exports.KeyValuePair = exports.EntityTagFilter = void 0;
/**
 * standardized tag filter used for filtering. Though it that it can be dynamically interrated on the existing values
 * and the is undefined conditions are anymore necessary on each attribute in filtering in the backend.
 * Goal is to increase consistency. If specific implementation is neeeded it can be as well implemented and given
 * to the EntityFilter
 */
var EntityTagFilter = /** @class */ (function () {
    function EntityTagFilter() {
    }
    return EntityTagFilter;
}());
exports.EntityTagFilter = EntityTagFilter;
var KeyValuePair = /** @class */ (function () {
    function KeyValuePair() {
    }
    return KeyValuePair;
}());
exports.KeyValuePair = KeyValuePair;
var FilterClause = /** @class */ (function () {
    function FilterClause() {
    }
    return FilterClause;
}());
exports.FilterClause = FilterClause;
