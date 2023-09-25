"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dependency = exports.DEPENDENCY_PREFIX = void 0;
require("reflect-metadata");
exports.DEPENDENCY_PREFIX = 'fb:dependency';
function Dependency(d) {
    return (target, propertyKey) => {
        if (d !== undefined && d !== null) {
            Reflect.defineMetadata(exports.DEPENDENCY_PREFIX, d, target, propertyKey);
        }
    };
}
exports.Dependency = Dependency;
//# sourceMappingURL=dependency.decorator.js.map