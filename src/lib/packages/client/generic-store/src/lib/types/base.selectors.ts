import { PaginationMeta } from '@next-levels/types';

export type BaseSelectors<EntityType, StateType> = {
  getEntities: (state: StateType) => EntityType[];
  getEntityLoading: (state: StateType) => boolean;
  getPagination: (state: StateType) => PaginationMeta | null;
  getEntityEntities: (state: StateType) => { [id: number]: EntityType };
  getSelectedEntityId: (state: StateType) => number | null | string;
  getSelectedEntity: (state: StateType) => EntityType | null;
  getIsLoading: (state: StateType) => boolean;
};
