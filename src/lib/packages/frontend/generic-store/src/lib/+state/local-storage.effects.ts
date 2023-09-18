import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { exhaustMap, mergeMap, Observable, of } from 'rxjs';
import { createGenericActions } from './generic.actions';
import { Action } from '@ngrx/store';
import { BaseService } from '../types/base.service';
import { FilterOptions } from '../../../../../shared/generics/src';

export class LocalStorageEffects<EntityType extends object> {
  constructor(
    public actions$: Actions,
    public entityService: BaseService<EntityType>,
    public entityActions: ReturnType<typeof createGenericActions>,
    public entityName: string
  ) {}

  loadEntitiesFiltered$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(this.entityActions.loadEntitiesFiltered),
        mergeMap(({ payload }: { payload: FilterOptions }) => {
          const localValue = localStorage.getItem(this.entityName);

          if (localValue) {
            return of(
              this.entityActions.loadEntitiesFilteredSuccess({
                payload: JSON.parse(localValue),
              })
            );
          } else {
            return of(
              this.entityActions.selectEntityFail({
                errors: 'No data found',
              })
            );
          }
        })
      ) as Observable<Action>
  );

  loadEntities$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(this.entityActions.load),
        switchMap(() => {
          const localValue = localStorage.getItem(this.entityName);
          if (localValue) {
            let parsedValue = JSON.parse(localValue);
            parsedValue = parsedValue.map((item: any, index: any) => {
              return { ...item, id: index };
            });

            return of(
              this.entityActions.loadSuccess({
                payload: parsedValue,
              })
            );
          }
          return of();
        })
      ) as Observable<Action>
  );

  loadEntitiesFilteredSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(this.entityActions.loadEntitiesFilteredSuccess),
        map((action: any) => {
          localStorage.setItem(this.entityName, JSON.stringify(action.payload));
        })
      ),
    { dispatch: false }
  );
}
