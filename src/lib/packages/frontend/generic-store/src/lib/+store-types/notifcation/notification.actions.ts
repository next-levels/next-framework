import { createAction, props } from '@ngrx/store';

export function createNotificationActions<EntityType>(entityName: string) {
  return {
    setEntity: createAction(
      `[${entityName} Page] Set Entity`,
      props<{ payload: EntityType }>()
    ),

    setEntitySuccess: createAction(
      `[${entityName} API] Set Entity Success`,
      props<{ payload: EntityType }>()
    ),

    setEntityFail: createAction(
      `[${entityName} API] Set Entity Fail`,
      props<{ error: any }>()
    ),

    setCount: createAction(
      `[${entityName} API] Set Count Entity Fail`,
      props<{ payload: { count: number } }>()
    ),

    resetCount: createAction(
      `[${entityName} API] Reset Count Entity Fail`,
      props<{ payload: any }>()
    ),
  };
}

export type NotificationActions<EntityType> = {
  resetCount: ReturnType<typeof createAction>;
  setCount: ReturnType<typeof createAction>;
  setEntityFail: ReturnType<typeof createAction>;

  setEntitySuccess: ReturnType<typeof createAction>;
  setEntity: ReturnType<typeof createAction>;
};
