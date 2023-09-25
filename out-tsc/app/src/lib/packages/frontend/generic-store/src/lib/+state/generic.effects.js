"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericEffects = exports.customOfType = void 0;
const effects_1 = require("@ngrx/effects");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const sweetalert2_1 = require("sweetalert2");
function customOfType(...allowedTypes) {
    return (0, operators_1.filter)((action) => allowedTypes.some((typeOrActionCreator) => {
        if (!typeOrActionCreator) {
            return false; // Skip this undefined action or type
        }
        if (typeof typeOrActionCreator === 'string') {
            return typeOrActionCreator === action.type;
        }
        return typeOrActionCreator.type === action.type;
    }));
}
exports.customOfType = customOfType;
class GenericEffects {
    constructor(actions$, entityService, entityActions, modelName = '', entityName = '', translateService) {
        this.actions$ = actions$;
        this.entityService = entityService;
        this.entityActions = entityActions;
        this.modelName = modelName;
        this.entityName = entityName;
        this.translateService = translateService;
        this.loadEntities$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.load), (0, operators_1.switchMap)(() => {
            return this.entityService.getAll().pipe((0, rxjs_1.tap)((entities) => console.info('Received entities:', entities)), (0, operators_1.map)((entities) => {
                return this.entityActions.loadSuccess({ payload: entities });
            }), (0, operators_1.catchError)((error) => {
                return (0, rxjs_1.of)(this.entityActions.loadFail({ error }));
            }));
        })));
        this.loadEntitiesFiltered$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.loadEntitiesFiltered), (0, rxjs_1.mergeMap)(({ payload }) => {
            return this.entityService.findByFilter(payload).pipe((0, operators_1.map)((paginated) => this.entityActions.loadEntitiesFilteredSuccess({
                payload: paginated,
            })), (0, operators_1.catchError)((error) => (0, rxjs_1.of)(this.entityActions.loadEntitiesFilteredFail({ error }))));
        })));
        this.selectEntity$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.selectEntity), (0, rxjs_1.mergeMap)((m) => this.entityService.getEntity(m.payload.entityId).pipe((0, operators_1.map)((entity) => this.entityActions.selectEntitySuccess({
            payload: {
                entity: entity,
            },
        })), (0, operators_1.catchError)((errors) => (0, rxjs_1.of)(this.entityActions.selectEntityFail({ errors })))))));
        this.loadEntitiesSuccess$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.loadSuccess), (0, operators_1.map)((action) => {
            return action;
        })), { dispatch: false });
        this.addEntity$ = (0, effects_1.createEffect)(() => this.actions$.pipe(
        // @ts-ignore
        customOfType(this.entityActions.addEntity), (0, rxjs_1.exhaustMap)((action) => this.entityService.addEntity(action.payload.entity).pipe((0, operators_1.map)((entity) => this.entityActions.addEntitySuccess({
            payload: { entity: entity },
        })), (0, operators_1.catchError)((error) => (0, rxjs_1.of)(this.entityActions.addEntityFail({ error })))))));
        this.addEntitySuccess$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.addEntitySuccess), (0, operators_1.map)((action) => action), (0, rxjs_1.tap)((action) => {
            if (action.payload.showPopup !== false) {
                // Only show popup if showPopup is not explicitly set to false
                let message = '';
                if (this.entityName && this.entityName !== '') {
                    if (this.modelName && this.modelName !== '') {
                        this.translateService
                            .get('test')
                            .subscribe((translated) => {
                            const labelCode = this.modelName + '.messages.' + 'success';
                            message = this.translateService.instant(labelCode);
                            if (!message || message === '') {
                                message =
                                    'Sie haben den ' +
                                        this.entityName +
                                        ' erfolgreich hinzugefügt!';
                            }
                        });
                    }
                    else {
                        message =
                            'Sie haben den ' +
                                this.entityName +
                                ' erfolgreich hinzugefügt!';
                    }
                    sweetalert2_1.default.fire({
                        title: 'Erfolgreich!',
                        text: message,
                        icon: 'success',
                        confirmButtonText: 'Verstanden',
                        heightAuto: false,
                    });
                }
            }
        })), { dispatch: false });
        this.deleteEntity$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.deleteEntity), (0, rxjs_1.exhaustMap)((action) => this.entityService.deleteEntity(action.payload.entity).pipe((0, operators_1.map)(() => this.entityActions.deleteEntitySuccess({
            payload: { entity: action.payload.entity },
        })), (0, operators_1.catchError)((error) => (0, rxjs_1.of)(this.entityActions.deleteEntityFail({ error })))))));
        this.deleteEntitySuccess$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.deleteEntitySuccess), (0, operators_1.map)((action) => action), (0, rxjs_1.tap)(() => {
            sweetalert2_1.default.fire({
                text: 'Sie haben den ' + this.entityName + ' erfolgreich gelöscht!',
                icon: 'success',
                buttonsStyling: false,
                confirmButtonText: 'Verstanden!',
                customClass: {
                    confirmButton: 'btn fw-bold btn-primary',
                },
            });
        })), { dispatch: false });
        this.editEntities$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.editEntity), (0, rxjs_1.exhaustMap)((action) => this.entityService
            .updateEntity(+action.payload.entity.id, action.payload.entity.changes)
            .pipe((0, operators_1.map)(() => {
            return this.entityActions.editEntitySuccess({
                payload: { entity: action.payload.entity },
            });
        }), (0, operators_1.catchError)((error) => (0, rxjs_1.of)(this.entityActions.editEntityFail({ error })))))));
        this.editEntitySuccess$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.editEntitySuccess), (0, operators_1.map)((action) => action), (0, rxjs_1.tap)((action) => {
            sweetalert2_1.default.fire({
                title: 'Erfolgreich!',
                text: 'Sie haben erfolgreich die Stammdaten gespeichert.',
                icon: 'success',
                confirmButtonText: 'Verstanden',
                heightAuto: false,
            });
        })), { dispatch: false });
        this.exportEntities$ = (0, effects_1.createEffect)(() => this.actions$.pipe(customOfType(this.entityActions.exportEntities), (0, rxjs_1.exhaustMap)((action) => 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.entityService.exportEntities(action.payload.entities).pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (0, operators_1.map)(() => this.entityActions.exportEntitiesSuccess({
            payload: { file: '' },
        })), (0, operators_1.catchError)((error) => (0, rxjs_1.of)(this.entityActions.exportEntitiesFail({ error })))))));
    }
}
exports.GenericEffects = GenericEffects;
//# sourceMappingURL=generic.effects.js.map