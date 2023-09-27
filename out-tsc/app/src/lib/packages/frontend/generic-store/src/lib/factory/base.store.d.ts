import { EntityAdapter, EntityState } from '@ngrx/entity';
import { BaseActions } from '../types/base.actions';
import { BaseSelectors } from '../types/base.selectors';
import { Action, ActionReducer } from '@ngrx/store';
import { GenericData } from '../types/generic.data';
export declare abstract class BaseStore<EntityType extends any, StateType extends GenericData<EntityType>> {
    entityName: string;
    featureKey: string;
    adapter: EntityAdapter<EntityType>;
    baseActions: BaseActions<EntityType>;
    baseReducers: ActionReducer<EntityState<EntityType>, Action>;
    baseSelectors: BaseSelectors<EntityType, StateType>;
    protected constructor(entityName: string);
    get baseReducer(): ActionReducer<EntityState<EntityType>, Action>;
}
