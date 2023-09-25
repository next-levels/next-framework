"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_level_transformer_util_1 = require("./log-level-transformer.util");
describe('Log-Level Transformer test', () => {
    it('should return false when string is empty', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)('')).toBe(false);
    });
    it('should return false when string is undefined', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)('')).toBe(false);
    });
    it('should return false when string has only spaces', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)('             ')).toBe(false);
    });
    it('should have pass with 1 log level', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)('warn')).toStrictEqual(['warn']);
    });
    it('should have pass with 2 log levels', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)('warn, asd, info,     ')).toStrictEqual(['warn']);
    });
    it('should have pass with 4 log levels', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)('verbose,error,warn,debug')).toStrictEqual([
            'verbose',
            'error',
            'warn',
            'debug',
        ]);
    });
    it('should pass and return all possible log level', () => {
        expect((0, log_level_transformer_util_1.transformLogLevel)(log_level_transformer_util_1.VALID_LOG_LEVELS.join(','))).toStrictEqual(log_level_transformer_util_1.VALID_LOG_LEVELS);
    });
});
//# sourceMappingURL=log-level-transformer.spec.js.map