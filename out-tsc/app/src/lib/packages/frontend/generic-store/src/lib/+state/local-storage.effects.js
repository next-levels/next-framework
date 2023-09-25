"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageEffects = void 0;
const effects_1 = require("@ngrx/effects");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
class LocalStorageEffects {
    constructor(actions$, entityService, entityActions, entityName) {
        this.actions$ = actions$;
        this.entityService = entityService;
        this.entityActions = entityActions;
        this.entityName = entityName;
        this.loadEntitiesFiltered$ = (0, effects_1.createEffect)(() => this.actions$.pipe((0, effects_1.ofType)(this.entityActions.loadEntitiesFiltered), (0, rxjs_1.mergeMap)(({ payload }) => {
            const localValue = localStorage.getItem(this.entityName);
            if (localValue) {
                return (0, rxjs_1.of)(this.entityActions.loadEntitiesFilteredSuccess({
                    payload: JSON.parse(localValue),
                }));
            }
            else {
                return (0, rxjs_1.of)(this.entityActions.selectEntityFail({
                    errors: 'No data found',
                }));
            }
        })));
        this.loadEntities$ = (0, effects_1.createEffect)(() => this.actions$.pipe((0, effects_1.ofType)(this.entityActions.load), (0, operators_1.switchMap)(() => {
            const localValue = localStorage.getItem(this.entityName);
            if (localValue) {
                let parsedValue = JSON.parse(localValue);
                parsedValue = parsedValue.map((item, index) => {
                    return { ...item, id: index };
                });
                return (0, rxjs_1.of)(this.entityActions.loadSuccess({
                    payload: parsedValue,
                }));
            }
            return (0, rxjs_1.of)();
        })));
        this.loadEntitiesFilteredSuccess = (0, effects_1.createEffect)(() => this.actions$.pipe((0, effects_1.ofType)(this.entityActions.loadEntitiesFilteredSuccess), (0, operators_1.map)((action) => {
            localStorage.setItem(this.entityName, JSON.stringify(action.payload));
        })), { dispatch: false });
    }
}
exports.LocalStorageEffects = LocalStorageEffects;
//# sourceMappingURL=local-storage.effects.js.map