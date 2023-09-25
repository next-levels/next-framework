"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookRegistryService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let HookRegistryService = class HookRegistryService {
    constructor() {
        this.hooks = {};
    }
    registerHook(key, hook) {
        this.hooks[key] = hook;
    }
    getHook(key) {
        return this.hooks[key];
    }
};
exports.HookRegistryService = HookRegistryService;
exports.HookRegistryService = HookRegistryService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], HookRegistryService);
//# sourceMappingURL=hook.regestry.js.map