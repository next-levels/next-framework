import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { customOfType } from '../../+state/generic.effects';

export class NotificationEffects<EntityType extends object> {
  constructor(
    public actions$: Actions,
    public entityActions: any,
    public modelName: string = ''
  ) {}

  // @ts-ignore
  setEntity$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(this.entityActions.setEntity),
        map((action: { payload: any }) => {
          // Adjust type here if necessary
          return this.entityActions.addEntitySuccess({
            payload: { entity: action.payload, showPopup: false },
          });
        }),
        catchError((error) => {
          return of(this.entityActions.addEntityFail({ error }));
        })
      ) as Observable<Action>
  );

  loadEntitiesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        customOfType(this.entityActions.loadSuccess),
        map((action: any) => {
          return this.entityActions.resetCount();
        })
      ),
    { dispatch: false }
  );
}
