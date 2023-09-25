"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleEmitterService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const meta_data_helper_1 = require("src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper");
let LifecycleEmitterService = class LifecycleEmitterService {
    constructor() {
        this.event = new event_emitter_1.EventEmitter2();
    }
    triggerEvent(model, method, data) {
        const options = meta_data_helper_1.META.getOptionsByModel(new model());
        let name = '';
        if (options) {
            name = options.name;
        }
        this.event.emit('events:' + name, { method: method, data: data });
    }
};
exports.LifecycleEmitterService = LifecycleEmitterService;
exports.LifecycleEmitterService = LifecycleEmitterService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], LifecycleEmitterService);
//# sourceMappingURL=lifecycle-emmiter.service.js.map