import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { GenericStore } from '../../factory/generic.store';
import { FilterOptions } from '@next-levels/types';

export class BaseStore<T, S> implements GenericStore {
  entityName: string;

  constructor(entityName: string) {
    this.entityName = entityName;
  }

  [key: string]: any;
  createReducer: () => any;
  initialState: () => any;
  createSelectors: () => any;
  createFacade: () => any;
  createEffects: () => any;
  createService: () => any;

  createActions() {
    return {
      load: createAction(`[${this.entityName} Page] Load`),

      loadSuccess: createAction(
        `[${this.entityName} API] Load Success`,
        props<{ payload: any[] }>()
      ),
      loadFail: createAction(
        `[${this.entityName} API] Load Fail`,
        props<{ error: any }>()
      ),

      loadEntitiesFiltered: createAction(
        `[${this.entityName} Page] Load Entities Filtered`,
        props<{ payload: FilterOptions }>()
      ),

      loadEntitiesFilteredSuccess: createAction(
        `[${this.entityName} API] Load Entities Filtered Success`,
        props<{ payload: any }>()
      ),

      loadEntitiesFilteredFail: createAction(
        `[${this.entityName} API] Load Entities Filtered Fail`,
        props<{ error: any }>()
      ),

      selectEntity: createAction(
        `[${this.entityName} Page] Select Entity`,
        props<{ payload: { entityId: number } }>()
      ),

      selectEntitySuccess: createAction(
        `[${this.entityName} API] Select Entity Success`,
        props<{ payload: { entity: T } }>()
      ),

      selectEntityFail: createAction(
        `[${this.entityName} API] Select Entity Fail`,
        props<{ errors: any }>()
      ),

      addEntity: createAction(
        `[${this.entityName} Page] Add Entity`,
        props<{ payload: { entity: T } }>()
      ),

      addEntitySuccess: createAction(
        `[${this.entityName} API] Add Entity Success`,
        props<{ payload: { entity: T } }>()
      ),

      addEntityFail: createAction(
        `[${this.entityName} API] Add Entity Fail`,
        props<{ error: any }>()
      ),

      editEntity: createAction(
        `[${this.entityName} Page] Edit Entity`,
        props<{ payload: { entity: Update<T> } }>()
      ),

      editEntitySuccess: createAction(
        `[${this.entityName} Page] Edit Entity Success`,
        props<{ payload: { entity: T } }>()
      ),

      editEntityFail: createAction(
        `[${this.entityName} Page] Edit Entity Fail`,
        props<{ error: any }>()
      ),

      deleteEntity: createAction(
        `[${this.entityName} Page] Delete Entity`,
        props<{ payload: { entity: T } }>()
      ),

      deleteEntitySuccess: createAction(
        `[${this.entityName} API] Delete Entity Success`,
        props<{ payload: { entity: T } }>()
      ),

      deleteEntityFail: createAction(
        `[${this.entityName} API] Delete Entity Fail`,
        props<{ error: any }>()
      ),

      exportEntities: createAction(
        `[${this.entityName} Page] Export Entities`,
        props<{ payload: { entities: T[] } }>()
      ),

      exportEntitiesSuccess: createAction(
        `[${this.entityName} API] Export Entities Success`,
        props<{ payload: { file: string } }>()
      ),

      exportEntitiesFail: createAction(
        `[${this.entityName} API] Export Entities Failed`,
        props<{ error: any }>()
      ),
    };
  }
}
