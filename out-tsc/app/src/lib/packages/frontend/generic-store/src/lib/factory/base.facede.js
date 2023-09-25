"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFacade = exports.StoreFacade = void 0;
class StoreFacade {
}
exports.StoreFacade = StoreFacade;
class BaseFacade extends StoreFacade {
    constructor(store, baseActions, baseSelectors) {
        super();
        this.store = store;
        this.baseActions = baseActions;
        this.baseSelectors = baseSelectors;
        this.loaded$ = this.store.select(this.baseSelectors.getIsLoading);
        this.all$ = this.store.select(this.baseSelectors.getEntities);
        this.filtered$ = this.store.select(this.baseSelectors.getEntities);
        this.selected$ = this.store.select(this.baseSelectors.getSelectedEntity);
        this.pagination$ = this.store.select(this.baseSelectors.getPagination);
    }
    loadAll() {
        this.store.dispatch(this.baseActions.load());
    }
    loadFiltered(filterOptions) {
        this.store.dispatch(this.baseActions.loadEntitiesFiltered({ payload: filterOptions }));
    }
    select(entityId) {
        this.store.dispatch(this.baseActions.selectEntity({ payload: { entityId } }));
    }
    update(entity) {
        this.store.dispatch(this.baseActions.editEntity({ payload: { entity } }));
    }
    add(entity) {
        this.store.dispatch(this.baseActions.addEntity({ payload: { entity } }));
    }
    delete(entity) {
        this.store.dispatch(this.baseActions.deleteEntity({ payload: { entity } }));
    }
}
exports.BaseFacade = BaseFacade;
//# sourceMappingURL=base.facede.js.map