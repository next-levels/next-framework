"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTIL = void 0;
var UTIL = /** @class */ (function () {
    function UTIL() {
    }
    UTIL.removeNullProperties = function (obj) {
        var newObj = __assign({}, obj);
        for (var prop in newObj) {
            if (newObj[prop] === null) {
                delete newObj[prop];
            }
        }
        return newObj;
    };
    return UTIL;
}());
exports.UTIL = UTIL;
