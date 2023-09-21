"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformLogLevel = exports.VALID_LOG_LEVELS = void 0;
exports.VALID_LOG_LEVELS = ['log', 'error', 'warn', 'debug', 'verbose'];
function transformLogLevel(raw) {
    if (!raw) {
        return false;
    }
    var rawWithoutSpaces = raw.replace(/ /g, '');
    if (rawWithoutSpaces.length === 0) {
        return false;
    }
    var nonValidatedLevels = rawWithoutSpaces.split(',');
    if (nonValidatedLevels.length === 0) {
        return false;
    }
    var validatedLogLevels = [];
    nonValidatedLevels.forEach(function (nonLevel) {
        var isValid = exports.VALID_LOG_LEVELS.find(function (v) { return v === nonLevel; }) !== undefined;
        if (!isValid) {
            console.warn("Log-Level ".concat(nonLevel, " isn't valid. It will be not used!"));
            return;
        }
        validatedLogLevels.push(nonLevel);
    });
    if (validatedLogLevels.length === 0) {
        return false;
    }
    return validatedLogLevels;
}
exports.transformLogLevel = transformLogLevel;
