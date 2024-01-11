import { createAction } from '@ngrx/store';

export type BaseActions<EntityType> = {
  load: ReturnType<typeof createAction>;
  loadSuccess: ReturnType<typeof createAction>;
  loadFail: ReturnType<typeof createAction>;

  loadEntitiesFiltered: ReturnType<typeof createAction>;
  loadEntitiesFilteredSuccess: ReturnType<typeof createAction>;
  loadEntitiesFilteredFail: ReturnType<typeof createAction>;

  selectEntity: ReturnType<typeof createAction>;
  selectEntitySuccess: ReturnType<typeof createAction>;
  selectEntityFail: ReturnType<typeof createAction>;

  addEntity: ReturnType<typeof createAction>;
  addEntitySuccess: ReturnType<typeof createAction>;
  addEntityFail: ReturnType<typeof createAction>;

  editEntity: ReturnType<typeof createAction>;
  editEntitySuccess: ReturnType<typeof createAction>;
  editEntityFail: ReturnType<typeof createAction>;

  deleteEntity: ReturnType<typeof createAction>;
  deleteEntitySuccess: ReturnType<typeof createAction>;
  deleteEntityFail: ReturnType<typeof createAction>;

  batchDeleteEntities: ReturnType<typeof createAction>;
  batchDeleteEntitiesSuccess: ReturnType<typeof createAction>;
  batchDeleteEntitiesFail: ReturnType<typeof createAction>;

  batchEditEntities: ReturnType<typeof createAction>;
  batchEditEntitiesSuccess: ReturnType<typeof createAction>;
  batchEditEntitiesFail: ReturnType<typeof createAction>;

  exportEntities: ReturnType<typeof createAction>;
  exportEntitiesSuccess: ReturnType<typeof createAction>;
  exportEntitiesFail: ReturnType<typeof createAction>;
};
