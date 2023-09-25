"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.to = void 0;
function to(obj) {
    return obj
        .then((data) => {
        return [null, data];
    })
        .catch((err) => [err]);
}
exports.to = to;
function handleError(error) {
    if (error) {
        throw error;
    }
}
exports.handleError = handleError;
//# sourceMappingURL=to.js.map