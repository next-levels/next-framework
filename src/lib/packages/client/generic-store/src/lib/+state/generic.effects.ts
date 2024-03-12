import { Actions, createEffect } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { exhaustMap, mergeMap, Observable, of, tap } from 'rxjs';
import { createGenericActions } from './generic.actions';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import Swal from 'sweetalert2';
import { BaseService } from '../types/base.service';
import { TranslateService } from '@ngx-translate/core';
import { EntityPaginated, FilterOptions } from '@next-levels/types';

export function customOfType(...allowedTypes: any[]) {
  return filter((action: any) =>
    allowedTypes.some((typeOrActionCreator) => {
      if (!typeOrActionCreator) {
        return false; // Skip this undefined action or type
      }

      if (typeof typeOrActionCreator === 'string') {
        return typeOrActionCreator === action.type;
      }

      return typeOrActionCreator.type === action.type;
    })
  );
}

export class GenericEffects<EntityType extends object> {
  constructor(
    public actions$: Actions,
    public entityService: BaseService<EntityType>,
    public entityActions: ReturnType<typeof createGenericActions>,
    public modelName: string = '',
    public entityName: string = '',
    public translateService: TranslateService
  ) {}

  loadEntities$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.load),

        switchMap(() => {
          return this.entityService.getAll().pipe(
            tap((entities) => console.info('Received entities:', entities)),
            map((entities: EntityType[]): Action => {
              return this.entityActions.loadSuccess({ payload: entities });
            }),
            catchError((error) => {
              return of<Action>(this.entityActions.loadFail({ error }));
            })
          );
        })
      ) as Observable<Action>
  );

  loadEntitiesFiltered$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.loadEntitiesFiltered),
        mergeMap(({ payload }: { payload: FilterOptions }) => {
          return this.entityService.findByFilter(payload).pipe(
            map((paginated: EntityPaginated<EntityType>) =>
              this.entityActions.loadEntitiesFilteredSuccess({
                payload: paginated,
              })
            ),
            catchError((error) =>
              of(this.entityActions.loadEntitiesFilteredFail({ error }))
            )
          );
        })
      ) as Observable<Action>
  );

    selectEntity$ = createEffect(
        () =>
            this.actions$.pipe(
                customOfType(this.entityActions.selectEntity),
                mergeMap((m: { payload: { entityId: number } }) =>
                    this.entityService.getEntity(m.payload.entityId).pipe(
                        map((entity: EntityType) => {
                             return this.entityActions.selectEntitySuccess({
                                payload: {
                                    entity: entity,
                                },
                            });
                        }),
                        catchError((errors) =>
                            of(this.entityActions.selectEntityFail({ errors }))
                        )
                    )
                )
            ) as Observable<Action>
    );

  loadEntitiesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.loadSuccess),
        map((action: any) => {
          return action;
        })
      ),
    { dispatch: false }
  );

  addEntity$ = createEffect(
    () =>
      this.actions$.pipe(
        // @ts-ignore
        customOfType(this.entityActions.addEntity),
        exhaustMap((action: { payload: { entity: EntityType } }) =>
          this.entityService.addEntity(action.payload.entity).pipe(
            map((entity: EntityType) =>
              this.entityActions.addEntitySuccess({
                payload: { entity: entity },
              })
            ),
            catchError((error) =>
              of(this.entityActions.addEntityFail({ error }))
            )
          )
        )
      ) as Observable<Action>
  );
  addEntitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.addEntitySuccess),
        map((action: any) => action),
        tap((action: any) => {
          if (action.payload.showPopup !== false) {
            // Only show popup if showPopup is not explicitly set to false
            let message = '';
            if (this.entityName && this.entityName !== '') {
              if (this.modelName && this.modelName !== '') {
                this.translateService
                  .get('test')
                  .subscribe((translated: string) => {
                    const labelCode = this.modelName + '.messages.' + 'success';
                    message = this.translateService.instant(labelCode);
                    if (!message || message === '') {
                      message =
                        'Sie haben den ' +
                        this.entityName +
                        ' erfolgreich hinzugefügt!';
                    }
                  });
              } else {
                message =
                  'Sie haben den ' +
                  this.entityName +
                  ' erfolgreich hinzugefügt!';
              }
              Swal.fire({
                title: 'Erfolgreich!',
                text: message,
                icon: 'success',
                confirmButtonText: 'Verstanden',
                heightAuto: false,
              });
            }
          }
        })
      ),
    { dispatch: false }
  );

  deleteEntity$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.deleteEntity),
        exhaustMap((action: any) =>
          this.entityService.deleteEntity(action.payload.entity).pipe(
            map(() =>
              this.entityActions.deleteEntitySuccess({
                payload: { entity: action.payload.entity },
              })
            ),
            catchError((error) =>
              of(this.entityActions.deleteEntityFail({ error }))
            )
          )
        )
      ) as Observable<Action>
  );

  deleteEntitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.deleteEntitySuccess),
        map((action: any) => action),
        tap(() => {
          Swal.fire({
            text: 'Sie haben den ' + this.entityName + ' erfolgreich gelöscht!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Verstanden!',
            customClass: {
              confirmButton: 'btn fw-bold btn-primary',
            },
          });
        })
      ),
    { dispatch: false }
  );

  batchDeleteEntities$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.batchDeleteEntities),
        exhaustMap((action: any) =>
          this.entityService.batchDeleteEntities(action.payload.entities).pipe(
            map(() =>
              this.entityActions.batchDeleteEntitiesSuccess({
                payload: { entities: action.payload.entities },
              })
            ),
            catchError((error) =>
              of(this.entityActions.batchDeleteEntitiesFail({ error }))
            )
          )
        )
      ) as Observable<Action>
  );

  batchDeleteEntitiesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.batchDeleteEntitiesSuccess),
        map((action: any) => action),
        tap(() => {
          Swal.fire({
            text: 'Sie haben die Einträge erfolgreich gelöscht!',
            icon: 'success',
            buttonsStyling: false,
            confirmButtonText: 'Verstanden!',
            customClass: {
              confirmButton: 'btn fw-bold btn-primary',
            },
          });
        })
      ),
    { dispatch: false }
  );

  editEntities$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.editEntity),
        exhaustMap((action: { payload: { entity: Update<EntityType> } }) =>
          this.entityService
            .updateEntity(
              action.payload.entity.id,
              action.payload.entity as EntityType
            )
            .pipe(
              map(() => {
                return this.entityActions.editEntitySuccess({
                  payload: { entity: action.payload.entity },
                });
              }),
              catchError((error) =>
                of(this.entityActions.editEntityFail({ error }))
              )
            )
        )
      ) as Observable<Action>
  );

  editEntitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.editEntitySuccess),
        map((action: any) => action),
        tap((action: any) => {
          Swal.fire({
            title: 'Erfolgreich!',
            text: 'Sie haben erfolgreich die Stammdaten gespeichert.',
            icon: 'success',
            confirmButtonText: 'Verstanden',
            heightAuto: false,
          });
        })
      ),
    { dispatch: false }
  );

  batchEditEntities$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.batchEditEntities),
        exhaustMap(
          (action: {
            payload: { ids: number[]; changes: Partial<EntityType> };
          }) =>
            this.entityService
              .batchEditEntities(action.payload.ids, action.payload.changes)
              .pipe(
                map((entities) => {
                   return this.entityActions.batchEditEntitiesSuccess({
                    payload: { entities: entities as unknown[] },
                  });
                }),
                catchError((error) =>
                  of(this.entityActions.batchEditEntitiesFail({ error }))
                )
              )
        )
      ) as Observable<Action>
  );

  batchEditEntitiesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.batchEditEntitiesSuccess),
        map((action: any) => action),
        tap((action: any) => {
          Swal.fire({
            title: 'Erfolgreich!',
            text: 'Sie haben erfolgreich die Stammdaten gespeichert.',
            icon: 'success',
            confirmButtonText: 'Verstanden',
            heightAuto: false,
          });
        })
      ),
    { dispatch: false }
  );

  exportEntities$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.exportEntities),
        exhaustMap((action: any) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.entityService.exportEntities(action.payload.entities).pipe(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            map(() =>
              this.entityActions.exportEntitiesSuccess({
                payload: { file: '' },
              })
            ),
            catchError((error) =>
              of(this.entityActions.exportEntitiesFail({ error }))
            )
          )
        )
      ) as Observable<Action>
  );
}
