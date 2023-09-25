"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEffects = void 0;
const effects_1 = require("@ngrx/effects");
const operators_1 = require("rxjs/operators");
const generic_effects_1 = require("../../+state/generic.effects");
class NotificationEffects {
    constructor(actions$, entityActions, modelName = '') {
        this.actions$ = actions$;
        this.entityActions = entityActions;
        this.modelName = modelName;
        this.setEntity$ = (0, effects_1.createEffect)(() => this.actions$.pipe(
        // @ts-ignore
        (0, generic_effects_1.customOfType)(this.entityActions.setEntity), (0, operators_1.map)((action) => {
            return this.entityActions.addEntitySuccess({
                payload: { entity: action.payload, showPopup: false },
            });
        })));
        this.loadEntitiesSuccess$ = (0, effects_1.createEffect)(() => this.actions$.pipe((0, generic_effects_1.customOfType)(this.entityActions.loadSuccess), (0, operators_1.map)((action) => {
            return this.entityActions.resetCount();
        })), { dispatch: false });
    }
}
exports.NotificationEffects = NotificationEffects;
//# sourceMappingURL=notification.effects.js.map