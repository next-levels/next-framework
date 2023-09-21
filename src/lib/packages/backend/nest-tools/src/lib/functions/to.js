"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.to = void 0;
function to(obj) {
    return obj
        .then(function (data) {
        return [null, data];
    })
        .catch(function (err) { return [err]; });
}
exports.to = to;
function handleError(error) {
    if (error) {
        throw error;
    }
}
exports.handleError = handleError;
