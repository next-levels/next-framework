"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageEffects = void 0;
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var LocalStorageEffects = /** @class */ (function () {
    function LocalStorageEffects(actions$, entityService, entityActions, entityName) {
        var _this = this;
        this.actions$ = actions$;
        this.entityService = entityService;
        this.entityActions = entityActions;
        this.entityName = entityName;
        this.loadEntitiesFiltered$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe((0, effects_1.ofType)(_this.entityActions.loadEntitiesFiltered), (0, rxjs_1.mergeMap)(function (_a) {
                var payload = _a.payload;
                var localValue = localStorage.getItem(_this.entityName);
                if (localValue) {
                    return (0, rxjs_1.of)(_this.entityActions.loadEntitiesFilteredSuccess({
                        payload: JSON.parse(localValue),
                    }));
                }
                else {
                    return (0, rxjs_1.of)(_this.entityActions.selectEntityFail({
                        errors: 'No data found',
                    }));
                }
            }));
        });
        this.loadEntities$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe((0, effects_1.ofType)(_this.entityActions.load), (0, operators_1.switchMap)(function () {
                var localValue = localStorage.getItem(_this.entityName);
                if (localValue) {
                    var parsedValue = JSON.parse(localValue);
                    parsedValue = parsedValue.map(function (item, index) {
                        return __assign(__assign({}, item), { id: index });
                    });
                    return (0, rxjs_1.of)(_this.entityActions.loadSuccess({
                        payload: parsedValue,
                    }));
                }
                return (0, rxjs_1.of)();
            }));
        });
        this.loadEntitiesFilteredSuccess = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe((0, effects_1.ofType)(_this.entityActions.loadEntitiesFilteredSuccess), (0, operators_1.map)(function (action) {
                localStorage.setItem(_this.entityName, JSON.stringify(action.payload));
            }));
        }, { dispatch: false });
    }
    return LocalStorageEffects;
}());
exports.LocalStorageEffects = LocalStorageEffects;
