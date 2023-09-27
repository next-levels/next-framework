import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { createGenericActions } from './generic.actions';
import { Action } from '@ngrx/store';
import { BaseService } from '../types/base.service';
export declare class LocalStorageEffects<EntityType extends object> {
    actions$: Actions;
    entityService: BaseService<EntityType>;
    entityActions: ReturnType<typeof createGenericActions>;
    entityName: string;
    constructor(actions$: Actions, entityService: BaseService<EntityType>, entityActions: ReturnType<typeof createGenericActions>, entityName: string);
    loadEntitiesFiltered$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    loadEntities$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    loadEntitiesFilteredSuccess: Observable<void> & import("@ngrx/effects").CreateEffectMetadata;
}
