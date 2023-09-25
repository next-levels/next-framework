"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentStorageService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let EnvironmentStorageService = class EnvironmentStorageService {
    constructor() {
        this.baseUrl = '';
    }
    setConfig(config) {
        this.baseUrl = config.baseUrl;
    }
};
exports.EnvironmentStorageService = EnvironmentStorageService;
exports.EnvironmentStorageService = EnvironmentStorageService = tslib_1.__decorate([
    (0, core_1.Injectable)({
        providedIn: 'root',
    })
], EnvironmentStorageService);
//# sourceMappingURL=environment-storage.service.js.map