export interface GenericStore {
    [key: string]: any;
    createActions: () => any;
    createReducer: () => any;
    initialState: () => any;
    createSelectors: () => any;
    createFacade: () => any;
    createEffects: () => any;
    createService: () => any;
}
