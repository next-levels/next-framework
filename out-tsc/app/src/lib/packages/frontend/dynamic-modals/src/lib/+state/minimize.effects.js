"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MinimizeEffects = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const minimize_store_1 = require("./minimize.store");
const core_2 = require("@ngx-translate/core");
const src_1 = require("../../../../generic-store/src");
const minimize_service_1 = require("../services/minimize/minimize.service");
let MinimizeEffects = class MinimizeEffects extends src_1.GenericEffects {
    constructor(actions$, minimizeService, minimizeStore, translateService) {
        super(actions$, minimizeService, minimizeStore.baseActions, 'MinimizedModal', 'MinimizedModal', translateService);
        this.minimizeService = minimizeService;
        this.minimizeStore = minimizeStore;
        this.translateService = translateService;
    }
};
exports.MinimizeEffects = MinimizeEffects;
exports.MinimizeEffects = MinimizeEffects = tslib_1.__decorate([
    (0, core_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [effects_1.Actions,
        minimize_service_1.MinimizeService,
        minimize_store_1.MinimizeStore,
        core_2.TranslateService])
], MinimizeEffects);
//# sourceMappingURL=minimize.effects.js.map