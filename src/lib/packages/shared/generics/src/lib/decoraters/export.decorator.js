"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = exports.EXPORT_PREFIX_ALL = exports.EXPORT_PREFIX = void 0;
require("reflect-metadata");
exports.EXPORT_PREFIX = 'fb:export';
exports.EXPORT_PREFIX_ALL = 'fb:export:all';
function Export(options) {
    return function (target, key) {
        if (options !== undefined && options !== null) {
            var all = Reflect.getMetadata(exports.EXPORT_PREFIX_ALL, target) || [];
            all.push(key);
            Reflect.defineMetadata(exports.EXPORT_PREFIX_ALL, all, target);
            return Reflect.defineMetadata(exports.EXPORT_PREFIX, options, target, key);
        }
        else {
            throw new Error('The @Visibility decorator can only be applied to methods.');
        }
    };
}
exports.Export = Export;
