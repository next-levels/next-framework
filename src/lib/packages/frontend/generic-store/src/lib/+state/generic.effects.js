"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEffects = exports.customOfType = void 0;
var effects_1 = require("@ngrx/effects");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var sweetalert2_1 = require("sweetalert2");
function customOfType() {
    var allowedTypes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        allowedTypes[_i] = arguments[_i];
    }
    return (0, operators_1.filter)(function (action) {
        return allowedTypes.some(function (typeOrActionCreator) {
            if (!typeOrActionCreator) {
                return false; // Skip this undefined action or type
            }
            if (typeof typeOrActionCreator === 'string') {
                return typeOrActionCreator === action.type;
            }
            return typeOrActionCreator.type === action.type;
        });
    });
}
exports.customOfType = customOfType;
var GenericEffects = /** @class */ (function () {
    function GenericEffects(actions$, entityService, entityActions, modelName, entityName, translateService) {
        var _this = this;
        if (modelName === void 0) { modelName = ''; }
        if (entityName === void 0) { entityName = ''; }
        this.actions$ = actions$;
        this.entityService = entityService;
        this.entityActions = entityActions;
        this.modelName = modelName;
        this.entityName = entityName;
        this.translateService = translateService;
        this.loadEntities$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.load), (0, operators_1.switchMap)(function () {
                return _this.entityService.getAll().pipe((0, rxjs_1.tap)(function (entities) { return console.info('Received entities:', entities); }), (0, operators_1.map)(function (entities) {
                    return _this.entityActions.loadSuccess({ payload: entities });
                }), (0, operators_1.catchError)(function (error) {
                    return (0, rxjs_1.of)(_this.entityActions.loadFail({ error: error }));
                }));
            }));
        });
        this.loadEntitiesFiltered$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.loadEntitiesFiltered), (0, rxjs_1.mergeMap)(function (_a) {
                var payload = _a.payload;
                return _this.entityService.findByFilter(payload).pipe((0, operators_1.map)(function (paginated) {
                    return _this.entityActions.loadEntitiesFilteredSuccess({
                        payload: paginated,
                    });
                }), (0, operators_1.catchError)(function (error) {
                    return (0, rxjs_1.of)(_this.entityActions.loadEntitiesFilteredFail({ error: error }));
                }));
            }));
        });
        this.selectEntity$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.selectEntity), (0, rxjs_1.mergeMap)(function (m) {
                return _this.entityService.getEntity(m.payload.entityId).pipe((0, operators_1.map)(function (entity) {
                    return _this.entityActions.selectEntitySuccess({
                        payload: {
                            entity: entity,
                        },
                    });
                }), (0, operators_1.catchError)(function (errors) {
                    return (0, rxjs_1.of)(_this.entityActions.selectEntityFail({ errors: errors }));
                }));
            }));
        });
        this.loadEntitiesSuccess$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.loadSuccess), (0, operators_1.map)(function (action) {
                return action;
            }));
        }, { dispatch: false });
        this.addEntity$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(
            // @ts-ignore
            customOfType(_this.entityActions.addEntity), (0, rxjs_1.exhaustMap)(function (action) {
                return _this.entityService.addEntity(action.payload.entity).pipe((0, operators_1.map)(function (entity) {
                    return _this.entityActions.addEntitySuccess({
                        payload: { entity: entity },
                    });
                }), (0, operators_1.catchError)(function (error) {
                    return (0, rxjs_1.of)(_this.entityActions.addEntityFail({ error: error }));
                }));
            }));
        });
        this.addEntitySuccess$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.addEntitySuccess), (0, operators_1.map)(function (action) { return action; }), (0, rxjs_1.tap)(function (action) {
                if (action.payload.showPopup !== false) {
                    // Only show popup if showPopup is not explicitly set to false
                    var message_1 = '';
                    if (_this.entityName && _this.entityName !== '') {
                        if (_this.modelName && _this.modelName !== '') {
                            _this.translateService
                                .get('test')
                                .subscribe(function (translated) {
                                var labelCode = _this.modelName + '.messages.' + 'success';
                                message_1 = _this.translateService.instant(labelCode);
                                if (!message_1 || message_1 === '') {
                                    message_1 =
                                        'Sie haben den ' +
                                            _this.entityName +
                                            ' erfolgreich hinzugefügt!';
                                }
                            });
                        }
                        else {
                            message_1 =
                                'Sie haben den ' +
                                    _this.entityName +
                                    ' erfolgreich hinzugefügt!';
                        }
                        sweetalert2_1.default.fire({
                            title: 'Erfolgreich!',
                            text: message_1,
                            icon: 'success',
                            confirmButtonText: 'Verstanden',
                            heightAuto: false,
                        });
                    }
                }
            }));
        }, { dispatch: false });
        this.deleteEntity$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.deleteEntity), (0, rxjs_1.exhaustMap)(function (action) {
                return _this.entityService.deleteEntity(action.payload.entity).pipe((0, operators_1.map)(function () {
                    return _this.entityActions.deleteEntitySuccess({
                        payload: { entity: action.payload.entity },
                    });
                }), (0, operators_1.catchError)(function (error) {
                    return (0, rxjs_1.of)(_this.entityActions.deleteEntityFail({ error: error }));
                }));
            }));
        });
        this.deleteEntitySuccess$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.deleteEntitySuccess), (0, operators_1.map)(function (action) { return action; }), (0, rxjs_1.tap)(function () {
                sweetalert2_1.default.fire({
                    text: 'Sie haben den ' + _this.entityName + ' erfolgreich gelöscht!',
                    icon: 'success',
                    buttonsStyling: false,
                    confirmButtonText: 'Verstanden!',
                    customClass: {
                        confirmButton: 'btn fw-bold btn-primary',
                    },
                });
            }));
        }, { dispatch: false });
        this.editEntities$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.editEntity), (0, rxjs_1.exhaustMap)(function (action) {
                return _this.entityService
                    .updateEntity(+action.payload.entity.id, action.payload.entity.changes)
                    .pipe((0, operators_1.map)(function () {
                    return _this.entityActions.editEntitySuccess({
                        payload: { entity: action.payload.entity },
                    });
                }), (0, operators_1.catchError)(function (error) {
                    return (0, rxjs_1.of)(_this.entityActions.editEntityFail({ error: error }));
                }));
            }));
        });
        this.editEntitySuccess$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.editEntitySuccess), (0, operators_1.map)(function (action) { return action; }), (0, rxjs_1.tap)(function (action) {
                sweetalert2_1.default.fire({
                    title: 'Erfolgreich!',
                    text: 'Sie haben erfolgreich die Stammdaten gespeichert.',
                    icon: 'success',
                    confirmButtonText: 'Verstanden',
                    heightAuto: false,
                });
            }));
        }, { dispatch: false });
        this.exportEntities$ = (0, effects_1.createEffect)(function () {
            return _this.actions$.pipe(customOfType(_this.entityActions.exportEntities), (0, rxjs_1.exhaustMap)(function (action) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return _this.entityService.exportEntities(action.payload.entities).pipe(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (0, operators_1.map)(function () {
                    return _this.entityActions.exportEntitiesSuccess({
                        payload: { file: '' },
                    });
                }), (0, operators_1.catchError)(function (error) {
                    return (0, rxjs_1.of)(_this.entityActions.exportEntitiesFail({ error: error }));
                }));
            }));
        });
    }
    return GenericEffects;
}());
exports.GenericEffects = GenericEffects;
