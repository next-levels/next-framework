"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceRegistryService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const meta_data_helper_1 = require("src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper");
let InstanceRegistryService = class InstanceRegistryService {
    constructor() {
        this.instanceMap = new Map();
    }
    register(model, instance) {
        const options = meta_data_helper_1.META.getOptionsByModel(new model());
        let key = '';
        if (options) {
            key = options.name;
        }
        this.instanceMap.set(key, instance);
    }
    retrieve(model) {
        let key = '';
        if (typeof model === 'string') {
            key = model;
        }
        if (typeof model === 'function') {
            const options = meta_data_helper_1.META.getOptionsByModel(new model());
            if (options) {
                key = options.name;
            }
        }
        return this.instanceMap.get(key);
    }
};
exports.InstanceRegistryService = InstanceRegistryService;
exports.InstanceRegistryService = InstanceRegistryService = tslib_1.__decorate([
    (0, core_1.Injectable)({ providedIn: 'root' })
], InstanceRegistryService);
//# sourceMappingURL=facade.regestry.js.map