import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseSelectors } from '../types/base.selectors';
import { Update } from '@ngrx/entity';
import { BasicFacade } from '../types/base.type';
import { FilterOptions, PaginationMeta } from '../../../../../shared/generics/src';
export declare abstract class StoreFacade {
}
export declare class BaseFacade<EntityType, StateType> extends StoreFacade implements BasicFacade<EntityType> {
    store: Store<StateType>;
    baseActions: any;
    baseSelectors: BaseSelectors<EntityType, StateType>;
    loaded$: Observable<boolean>;
    all$: Observable<EntityType[]>;
    filtered$: Observable<EntityType[]>;
    selected$: Observable<EntityType | null>;
    pagination$: Observable<PaginationMeta | null>;
    constructor(store: Store<StateType>, baseActions: any, baseSelectors: BaseSelectors<EntityType, StateType>);
    loadAll(): void;
    loadFiltered(filterOptions: FilterOptions): void;
    select(entityId: number): void;
    update(entity: Update<EntityType>): void;
    add(entity: EntityType): void;
    delete(entity: EntityType): void;
}
