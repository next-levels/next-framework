import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { BaseActions } from '../types/base.actions';
import { BaseSelectors } from '../types/base.selectors';
import { Action, ActionReducer } from '@ngrx/store';
import { GenericData } from '../types/generic.data';
import { createGenericActions } from '../+state/generic.actions';
import { createGenericSelectors } from '../+state/generic.selectors';
 import {createBaseReducers} from "../+state/base.reducers";

export abstract class BaseStore<
  EntityType extends any,
  StateType extends GenericData<EntityType>
> {
  public featureKey: string;
  public adapter: EntityAdapter<EntityType> = createEntityAdapter<EntityType>();

  public baseActions: BaseActions<EntityType>;
  public baseReducers: ActionReducer<EntityState<EntityType>, Action>;

  public baseSelectors: BaseSelectors<EntityType, StateType>;

  protected constructor(public entityName: string) {
    this.featureKey = entityName;
    this.baseActions = createGenericActions<EntityType>(entityName);
    this.baseSelectors = createGenericSelectors<EntityType, StateType>(
      entityName,
      this.adapter
    );
  }

  public get baseReducer(): ActionReducer<EntityState<EntityType>, Action> {
    return createBaseReducers(
      this.entityName,
      this.baseActions as unknown as ReturnType<typeof createGenericActions>,
      this.adapter
    );
  }
}
