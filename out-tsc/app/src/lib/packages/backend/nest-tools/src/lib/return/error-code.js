"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
class ErrorCode {
    constructor(message, httpCode, changeHttpCode = true) {
        this.message = message;
        this.httpCode = httpCode;
        this.changeHttpCode = changeHttpCode;
    }
}
exports.ErrorCode = ErrorCode;
//# sourceMappingURL=error-code.js.map