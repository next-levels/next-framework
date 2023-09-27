import { Dictionary, EntityAdapter } from '@ngrx/entity';
import { GenericData } from '../types/generic.data';
import { BaseSelectors } from '../types/base.selectors';
export declare function createGenericSelectors<EntityType, StateType extends GenericData<EntityType>>(featureKey: string, entityAdapter: EntityAdapter<EntityType>): BaseSelectors<EntityType, StateType>;
export declare function createGenericSelectorsFeature<EntityType, StateType extends object>(featureKey: string, entityAdapter: EntityAdapter<EntityType>): {
    getEntities: (state: object) => EntityType[];
    getEntityLoading: import("@ngrx/store").MemoizedSelector<object, boolean, (s1: GenericData<EntityType>) => boolean>;
    getPagination: import("@ngrx/store").MemoizedSelector<object, import("../../../../../../..").PaginationMeta, (s1: GenericData<EntityType>) => import("../../../../../../..").PaginationMeta>;
    getEntityEntities: import("@ngrx/store").MemoizedSelector<object, Record<number, EntityType>, (s1: Dictionary<EntityType>) => Record<number, EntityType>>;
    getSelectedEntityId: import("@ngrx/store").MemoizedSelector<object, string | number, (s1: GenericData<EntityType>) => string | number>;
    getSelectedEntity: import("@ngrx/store").MemoizedSelector<object, EntityType, (s1: Record<number, EntityType>, s2: string | number) => EntityType>;
    getIsLoading: import("@ngrx/store").MemoizedSelector<object, any, (s1: any) => any>;
};
