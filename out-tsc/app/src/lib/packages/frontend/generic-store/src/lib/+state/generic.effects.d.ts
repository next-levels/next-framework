import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { createGenericActions } from './generic.actions';
import { Action } from '@ngrx/store';
import { BaseService } from '../types/base.service';
import { TranslateService } from '@ngx-translate/core';
export declare function customOfType(...allowedTypes: any[]): import("rxjs").MonoTypeOperatorFunction<any>;
export declare class GenericEffects<EntityType extends object> {
    actions$: Actions;
    entityService: BaseService<EntityType>;
    entityActions: ReturnType<typeof createGenericActions>;
    modelName: string;
    entityName: string;
    translateService: TranslateService;
    constructor(actions$: Actions, entityService: BaseService<EntityType>, entityActions: ReturnType<typeof createGenericActions>, modelName: string, entityName: string, translateService: TranslateService);
    loadEntities$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    loadEntitiesFiltered$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    selectEntity$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    loadEntitiesSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    addEntity$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    addEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    deleteEntity$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    deleteEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    editEntities$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
    editEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    exportEntities$: Observable<Action> & import("@ngrx/effects").CreateEffectMetadata;
}
