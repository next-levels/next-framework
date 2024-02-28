import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseSelectors } from '../types/base.selectors';
import { Update } from '@ngrx/entity';
import { BasicFacade } from '../types/base.type';
import { FilterOptions, PaginationMeta } from '@next-levels/types';

export abstract class StoreFacade {}
export class BaseFacade<EntityType, StateType>
  extends StoreFacade
  implements BasicFacade<EntityType>
{
  loaded$: Observable<boolean>;
  all$: Observable<EntityType[]>;
  filtered$: Observable<EntityType[]>;
  selected$: Observable<EntityType | null>;
  pagination$: Observable<PaginationMeta | null>;

  constructor(
    public store: Store<StateType>,
    public baseActions: any,
    public baseSelectors: BaseSelectors<EntityType, StateType>
  ) {
    super();
    this.loaded$ = this.store.select(this.baseSelectors.getIsLoading);
    this.all$ = this.store.select(this.baseSelectors.getEntities);
    this.filtered$ = this.store.select(this.baseSelectors.getEntities);
    this.selected$ = this.store.select(this.baseSelectors.getSelectedEntity);

    this.pagination$ = this.store.select(this.baseSelectors.getPagination);
  }

  loadAll() {
    this.store.dispatch(this.baseActions.load());
  }

  loadFiltered(filterOptions: FilterOptions) {
    this.store.dispatch(
      this.baseActions.loadEntitiesFiltered({ payload: filterOptions })
    );
  }

  select(entityId: number) {
     this.store.dispatch(
      this.baseActions.selectEntity({ payload: { entityId } })
    );
  }

  update(entity: Update<EntityType>): void {
    this.store.dispatch(this.baseActions.editEntity({ payload: { entity } }));
  }

  public add(entity: EntityType) {
    this.store.dispatch(this.baseActions.addEntity({ payload: { entity } }));
  }

  delete(entity: EntityType) {
    this.store.dispatch(this.baseActions.deleteEntity({ payload: { entity } }));
  }

  batchDelete(entities: EntityType[]) {
    this.store.dispatch(
      this.baseActions.batchDeleteEntities({ payload: { entities } })
    );
  }

  batchEdit(ids: number[], changes: Partial<EntityType>): void {
    this.store.dispatch(
      this.baseActions.batchEditEntities({ payload: { ids, changes } })
    );
  }
}
