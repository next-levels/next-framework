"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEffects = void 0;
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var generic_effects_1 = require("../../+state/generic.effects");
var NotificationEffects = /** @class */ (function () {
    function NotificationEffects(actions$, entityActions, modelName) {
        var _this = this;
        if (modelName === void 0) { modelName = ''; }
        this.actions$ = actions$;
        this.entityActions = entityActions;
        this.modelName = modelName;
        this.setEntity$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(
            // @ts-ignore
            (0, generic_effects_1.customOfType)(_this.entityActions.setEntity), (0, operators_1.map)(function (action) {
                return _this.entityActions.addEntitySuccess({
                    payload: { entity: action.payload, showPopup: false },
                });
            }));
        });
        this.loadEntitiesSuccess$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe((0, generic_effects_1.customOfType)(_this.entityActions.loadSuccess), (0, operators_1.map)(function (action) {
                return _this.entityActions.resetCount();
            }));
        }, { dispatch: false });
    }
    return NotificationEffects;
}());
exports.NotificationEffects = NotificationEffects;
