import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  createGenericActions,
  createGenericReducer,
  createGenericSelectors,
  GenericData,
} from '@nxtlvls/generic-store';
import { BaseActions } from '../types/base.actions';
import { BaseSelectors } from '../types/base.selectors';
import { Action, ActionReducer } from '@ngrx/store';

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
    return createGenericReducer(
      this.entityName,
      this.baseActions as unknown as ReturnType<typeof createGenericActions>,
      this.adapter
    );
  }
}
