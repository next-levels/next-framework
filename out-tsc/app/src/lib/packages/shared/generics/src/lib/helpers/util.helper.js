"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UTIL = void 0;
class UTIL {
    static removeNullProperties(obj) {
        const newObj = { ...obj };
        for (const prop in newObj) {
            if (newObj[prop] === null) {
                delete newObj[prop];
            }
        }
        return newObj;
    }
}
exports.UTIL = UTIL;
//# sourceMappingURL=util.helper.js.map