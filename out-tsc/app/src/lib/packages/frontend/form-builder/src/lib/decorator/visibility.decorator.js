"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visibility = exports.VISIBILITY_PREFIX_ALL = exports.VISIBILITY_PREFIX = void 0;
require("reflect-metadata");
exports.VISIBILITY_PREFIX = 'fb:visibility';
exports.VISIBILITY_PREFIX_ALL = 'fb:visibility:all';
function Visibility(options) {
    return (target, key) => {
        if (options !== undefined && options !== null) {
            const all = Reflect.getMetadata(exports.VISIBILITY_PREFIX_ALL, target) || [];
            all.push(key);
            Reflect.defineMetadata(exports.VISIBILITY_PREFIX_ALL, all, target);
            return Reflect.defineMetadata(exports.VISIBILITY_PREFIX, options, target, key);
        }
        else {
            throw new Error('The @Visibility decorator can only be applied to methods.');
        }
    };
}
exports.Visibility = Visibility;
//# sourceMappingURL=visibility.decorator.js.map