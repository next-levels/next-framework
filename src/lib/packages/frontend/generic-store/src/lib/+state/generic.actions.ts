import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { FilterOptions } from '../../../../../shared/generics/src';

export function createGenericActions<T>(entityName: string) {
  return {
    load: createAction(`[${entityName} Page] Load`),

    loadSuccess: createAction(
      `[${entityName} API] Load Success`,
      props<{ payload: any[] }>()
    ),
    loadFail: createAction(
      `[${entityName} API] Load Fail`,
      props<{ error: any }>()
    ),

    loadEntitiesFiltered: createAction(
      `[${entityName} Page] Load Entities Filtered`,
      props<{ payload: FilterOptions }>()
    ),

    loadEntitiesFilteredSuccess: createAction(
      `[${entityName} API] Load Entities Filtered Success`,
      props<{ payload: any }>()
    ),

    loadEntitiesFilteredFail: createAction(
      `[${entityName} API] Load Entities Filtered Fail`,
      props<{ error: any }>()
    ),

    selectEntity: createAction(
      `[${entityName} Page] Select Entity`,
      props<{ payload: { entityId: number } }>()
    ),

    selectEntitySuccess: createAction(
      `[${entityName} API] Select Entity Success`,
      props<{ payload: { entity: T } }>()
    ),

    selectEntityFail: createAction(
      `[${entityName} API] Select Entity Fail`,
      props<{ errors: any }>()
    ),

    addEntity: createAction(
      `[${entityName} Page] Add Entity`,
      props<{ payload: { entity: T } }>()
    ),

    addEntitySuccess: createAction(
      `[${entityName} API] Add Entity Success`,
      props<{ payload: { entity: T; showPopup?: boolean } }>()
    ),

    addEntityFail: createAction(
      `[${entityName} API] Add Entity Fail`,
      props<{ error: any }>()
    ),

    editEntity: createAction(
      `[${entityName} Page] Edit Entity`,
      props<{ payload: { entity: Update<T> } }>()
    ),

    editEntitySuccess: createAction(
      `[${entityName} Page] Edit Entity Success`,
      props<{ payload: { entity: T } }>()
    ),

    editEntityFail: createAction(
      `[${entityName} Page] Edit Entity Fail`,
      props<{ error: any }>()
    ),

    deleteEntity: createAction(
      `[${entityName} Page] Delete Entity`,
      props<{ payload: { entity: T } }>()
    ),

    deleteEntitySuccess: createAction(
      `[${entityName} API] Delete Entity Success`,
      props<{ payload: { entity: T } }>()
    ),

    deleteEntityFail: createAction(
      `[${entityName} API] Delete Entity Fail`,
      props<{ error: any }>()
    ),

    exportEntities: createAction(
      `[${entityName} Page] Export Entities`,
      props<{ payload: { entities: T[] } }>()
    ),

    exportEntitiesSuccess: createAction(
      `[${entityName} API] Export Entities Success`,
      props<{ payload: { file: string } }>()
    ),

    exportEntitiesFail: createAction(
      `[${entityName} API] Export Entities Failed`,
      props<{ error: any }>()
    ),
  };
}
