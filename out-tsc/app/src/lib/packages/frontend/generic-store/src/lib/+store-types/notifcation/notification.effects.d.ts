import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
export declare class NotificationEffects<EntityType extends object> {
    actions$: Actions;
    entityActions: any;
    modelName: string;
    constructor(actions$: Actions, entityActions: any, modelName?: string);
    setEntity$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    loadEntitiesSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
}
