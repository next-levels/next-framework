import { Actions, createEffect } from '@ngrx/effects';
import { createGenericActions } from '../../+state/generic.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { customOfType } from '../../+state/generic.effects';

export class NotificationEffects<EntityType extends object> {
  constructor(
    public actions$: Actions,
    public entityActions: any,
    public modelName: string = ''
  ) {}

  setEntity$ = createEffect(
    () =>
      this.actions$.pipe(
        // @ts-ignore
        customOfType(this.entityActions.setEntity),
        map((action: { payload: { entity: EntityType } }) => {
          return this.entityActions.addEntitySuccess({
            payload: { entity: action.payload, showPopup: false },
          });
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
