"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode = /** @class */ (function () {
    function ErrorCode(message, httpCode, changeHttpCode) {
        if (changeHttpCode === void 0) { changeHttpCode = true; }
        this.message = message;
        this.httpCode = httpCode;
        this.changeHttpCode = changeHttpCode;
    }
    return ErrorCode;
}());
exports.ErrorCode = ErrorCode;
