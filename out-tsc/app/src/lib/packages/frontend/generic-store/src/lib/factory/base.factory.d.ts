import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { BaseActions } from '../types/base.actions';
import { BaseSelectors } from '../types/base.selectors';
import { EffectsConfig } from '../types/effects-config.type';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from '../types/base.service';
import { EntityPaginated, FilterOptions } from '../../../../../shared/generics/src';
import { BaseStore } from './base.store';
import { GenericData } from '../types/generic.data';
export declare function createBaseService<T extends object>(modelUrl: string): {
    new (_http: HttpClient): {
        _http: HttpClient;
        getEntity(id: number): Observable<T>;
        getAll(): Observable<T[]>;
        findByFilter(filter: FilterOptions): Observable<EntityPaginated<T>>;
        addEntity(data: T): Observable<T>;
        deleteEntity(entity: T): Observable<T>;
        updateEntity(id: number, data: Partial<T>): Observable<T>;
    };
};
export declare function createStore<T extends object>(modelName: string): {
    new (): {
        featureKey: string;
        adapter: import("@ngrx/entity").EntityAdapter<T>;
        baseActions: BaseActions<T>;
        baseReducers: import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<T>, import("@ngrx/store").Action>;
        baseSelectors: BaseSelectors<T, GenericData<T>>;
        entityName: string;
        readonly baseReducer: import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<T>, import("@ngrx/store").Action>;
    };
    getReducers(): import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<T>, import("@ngrx/store").Action>;
    getActions(): BaseActions<T>;
    getSelectors(): BaseSelectors<T, GenericData<T>>;
};
export declare function createBaseEffects<T extends object>(serviceToken: InjectionToken<BaseService<T>>, actions: any, name: string, label?: string): {
    new (actions$: Actions, service: BaseService<T>, translateService: TranslateService): {
        actions$: Actions;
        service: BaseService<T>;
        translateService: TranslateService;
        entityService: BaseService<T>;
        entityActions: {
            load: import("@ngrx/store").ActionCreator<`[${string} Page] Load`, () => import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load`>>;
            loadSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Success`, (props: {
                payload: any[];
            }) => {
                payload: any[];
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Success`>>;
            loadFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Fail`>>;
            loadEntitiesFiltered: import("@ngrx/store").ActionCreator<`[${string} Page] Load Entities Filtered`, (props: {
                payload: FilterOptions;
            }) => {
                payload: FilterOptions;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load Entities Filtered`>>;
            loadEntitiesFilteredSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Success`, (props: {
                payload: any;
            }) => {
                payload: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Success`>>;
            loadEntitiesFilteredFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Fail`>>;
            selectEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Select Entity`, (props: {
                payload: {
                    entityId: number;
                };
            }) => {
                payload: {
                    entityId: number;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Select Entity`>>;
            selectEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Success`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Success`>>;
            selectEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Fail`, (props: {
                errors: any;
            }) => {
                errors: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Fail`>>;
            addEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Add Entity`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Add Entity`>>;
            addEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Success`, (props: {
                payload: {
                    entity: unknown;
                    showPopup?: boolean;
                };
            }) => {
                payload: {
                    entity: unknown;
                    showPopup?: boolean;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Success`>>;
            addEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Fail`>>;
            editEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity`, (props: {
                payload: {
                    entity: import("@ngrx/entity").Update<unknown>;
                };
            }) => {
                payload: {
                    entity: import("@ngrx/entity").Update<unknown>;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity`>>;
            editEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Success`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Success`>>;
            editEntityFail: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Fail`>>;
            deleteEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Delete Entity`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Delete Entity`>>;
            deleteEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Success`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Success`>>;
            deleteEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Fail`>>;
            exportEntities: import("@ngrx/store").ActionCreator<`[${string} Page] Export Entities`, (props: {
                payload: {
                    entities: unknown[];
                };
            }) => {
                payload: {
                    entities: unknown[];
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Export Entities`>>;
            exportEntitiesSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Success`, (props: {
                payload: {
                    file: string;
                };
            }) => {
                payload: {
                    file: string;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Success`>>;
            exportEntitiesFail: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Failed`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Failed`>>;
        };
        modelName: string;
        entityName: string;
        loadEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        loadEntitiesFiltered$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        selectEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        loadEntitiesSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
        addEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        addEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
        deleteEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        deleteEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
        editEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        editEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
        exportEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
    };
};
export declare function createLocalStorageEffects<T extends object>(serviceToken: InjectionToken<BaseService<T>>, storeToken: InjectionToken<BaseStore<T, GenericData<T>>>, modelName: string): {
    new (actions$: Actions, service: BaseService<T>, store: BaseStore<T, GenericData<T>>): {
        actions$: Actions;
        service: BaseService<T>;
        store: BaseStore<T, GenericData<T>>;
        entityService: BaseService<T>;
        entityActions: {
            load: import("@ngrx/store").ActionCreator<`[${string} Page] Load`, () => import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load`>>;
            loadSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Success`, (props: {
                payload: any[];
            }) => {
                payload: any[];
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Success`>>;
            loadFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Fail`>>;
            loadEntitiesFiltered: import("@ngrx/store").ActionCreator<`[${string} Page] Load Entities Filtered`, (props: {
                payload: FilterOptions;
            }) => {
                payload: FilterOptions;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load Entities Filtered`>>;
            loadEntitiesFilteredSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Success`, (props: {
                payload: any;
            }) => {
                payload: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Success`>>;
            loadEntitiesFilteredFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Fail`>>;
            selectEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Select Entity`, (props: {
                payload: {
                    entityId: number;
                };
            }) => {
                payload: {
                    entityId: number;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Select Entity`>>;
            selectEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Success`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Success`>>;
            selectEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Fail`, (props: {
                errors: any;
            }) => {
                errors: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Fail`>>;
            addEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Add Entity`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Add Entity`>>;
            addEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Success`, (props: {
                payload: {
                    entity: unknown;
                    showPopup?: boolean;
                };
            }) => {
                payload: {
                    entity: unknown;
                    showPopup?: boolean;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Success`>>;
            addEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Fail`>>;
            editEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity`, (props: {
                payload: {
                    entity: import("@ngrx/entity").Update<unknown>;
                };
            }) => {
                payload: {
                    entity: import("@ngrx/entity").Update<unknown>;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity`>>;
            editEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Success`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Success`>>;
            editEntityFail: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Fail`>>;
            deleteEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Delete Entity`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Delete Entity`>>;
            deleteEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Success`, (props: {
                payload: {
                    entity: unknown;
                };
            }) => {
                payload: {
                    entity: unknown;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Success`>>;
            deleteEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Fail`>>;
            exportEntities: import("@ngrx/store").ActionCreator<`[${string} Page] Export Entities`, (props: {
                payload: {
                    entities: unknown[];
                };
            }) => {
                payload: {
                    entities: unknown[];
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Export Entities`>>;
            exportEntitiesSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Success`, (props: {
                payload: {
                    file: string;
                };
            }) => {
                payload: {
                    file: string;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Success`>>;
            exportEntitiesFail: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Failed`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Failed`>>;
        };
        entityName: string;
        loadEntitiesFiltered$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        loadEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        loadEntitiesFilteredSuccess: Observable<void> & import("@ngrx/effects").CreateEffectMetadata;
    };
};
export declare function createBaseFacade<T>(storeClass: any, actions: BaseActions<T>, selectors: BaseSelectors<T, GenericData<T>>): {
    new (store: Store<GenericData<T>>): {
        store: Store<GenericData<T>>;
        loaded$: Observable<boolean>;
        all$: Observable<T[]>;
        filtered$: Observable<T[]>;
        selected$: Observable<T>;
        pagination$: Observable<import("../../../../../shared/generics/src").PaginationMeta>;
        baseActions: any;
        baseSelectors: BaseSelectors<T, GenericData<T>>;
        loadAll(): void;
        loadFiltered(filterOptions: FilterOptions): void;
        select(entityId: number): void;
        update(entity: import("@ngrx/entity").Update<T>): void;
        add(entity: T): void;
        delete(entity: T): void;
    };
};
export declare function createBaseFacadeInstance<T, S>(storeClass: any, actions: any, selectors: any): {
    store: Store<S>;
    loaded$: Observable<boolean>;
    all$: Observable<T[]>;
    filtered$: Observable<T[]>;
    selected$: Observable<T>;
    pagination$: Observable<import("../../../../../shared/generics/src").PaginationMeta>;
    baseActions: any;
    baseSelectors: BaseSelectors<T, S>;
    loadAll(): void;
    loadFiltered(filterOptions: FilterOptions): void;
    select(entityId: number): void;
    update(entity: import("@ngrx/entity").Update<T>): void;
    add(entity: T): void;
    delete(entity: T): void;
};
export declare function createBaseEffectServicePair<T extends object>(config: EffectsConfig): {
    serviceToken: InjectionToken<any>;
    service: {
        new (_http: HttpClient): {
            _http: HttpClient;
            getEntity(id: number): Observable<T>;
            getAll(): Observable<T[]>;
            findByFilter(filter: FilterOptions): Observable<EntityPaginated<T>>;
            addEntity(data: T): Observable<T>;
            deleteEntity(entity: T): Observable<T>;
            updateEntity(id: number, data: Partial<T>): Observable<T>;
        };
    };
    effect: {
        new (actions$: Actions<import("@ngrx/store").Action>, service: BaseService<T>, translateService: TranslateService): {
            actions$: Actions<import("@ngrx/store").Action>;
            service: BaseService<T>;
            translateService: TranslateService;
            entityService: BaseService<T>;
            entityActions: {
                load: import("@ngrx/store").ActionCreator<`[${string} Page] Load`, () => import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load`>>;
                loadSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Success`, (props: {
                    payload: any[];
                }) => {
                    payload: any[];
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Success`>>;
                loadFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Fail`, (props: {
                    error: any;
                }) => {
                    error: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Fail`>>;
                loadEntitiesFiltered: import("@ngrx/store").ActionCreator<`[${string} Page] Load Entities Filtered`, (props: {
                    payload: FilterOptions;
                }) => {
                    payload: FilterOptions;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load Entities Filtered`>>;
                loadEntitiesFilteredSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Success`, (props: {
                    payload: any;
                }) => {
                    payload: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Success`>>;
                loadEntitiesFilteredFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Fail`, (props: {
                    error: any;
                }) => {
                    error: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Fail`>>;
                selectEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Select Entity`, (props: {
                    payload: {
                        entityId: number;
                    };
                }) => {
                    payload: {
                        entityId: number;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Select Entity`>>;
                selectEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Success`, (props: {
                    payload: {
                        entity: unknown;
                    };
                }) => {
                    payload: {
                        entity: unknown;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Success`>>;
                selectEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Fail`, (props: {
                    errors: any;
                }) => {
                    errors: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Fail`>>;
                addEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Add Entity`, (props: {
                    payload: {
                        entity: unknown;
                    };
                }) => {
                    payload: {
                        entity: unknown;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Add Entity`>>;
                addEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Success`, (props: {
                    payload: {
                        entity: unknown;
                        showPopup?: boolean;
                    };
                }) => {
                    payload: {
                        entity: unknown;
                        showPopup?: boolean;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Success`>>;
                addEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Fail`, (props: {
                    error: any;
                }) => {
                    error: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Fail`>>;
                editEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity`, (props: {
                    payload: {
                        entity: import("@ngrx/entity").Update<unknown>;
                    };
                }) => {
                    payload: {
                        entity: import("@ngrx/entity").Update<unknown>;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity`>>;
                editEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Success`, (props: {
                    payload: {
                        entity: unknown;
                    };
                }) => {
                    payload: {
                        entity: unknown;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Success`>>;
                editEntityFail: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Fail`, (props: {
                    error: any;
                }) => {
                    error: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Fail`>>;
                deleteEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Delete Entity`, (props: {
                    payload: {
                        entity: unknown;
                    };
                }) => {
                    payload: {
                        entity: unknown;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Delete Entity`>>;
                deleteEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Success`, (props: {
                    payload: {
                        entity: unknown;
                    };
                }) => {
                    payload: {
                        entity: unknown;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Success`>>;
                deleteEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Fail`, (props: {
                    error: any;
                }) => {
                    error: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Fail`>>;
                exportEntities: import("@ngrx/store").ActionCreator<`[${string} Page] Export Entities`, (props: {
                    payload: {
                        entities: unknown[];
                    };
                }) => {
                    payload: {
                        entities: unknown[];
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Export Entities`>>;
                exportEntitiesSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Success`, (props: {
                    payload: {
                        file: string;
                    };
                }) => {
                    payload: {
                        file: string;
                    };
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Success`>>;
                exportEntitiesFail: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Failed`, (props: {
                    error: any;
                }) => {
                    error: any;
                } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Failed`>>;
            };
            modelName: string;
            entityName: string;
            loadEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            loadEntitiesFiltered$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            selectEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            loadEntitiesSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
            addEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            addEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
            deleteEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            deleteEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
            editEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            editEntitySuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
            exportEntities$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        };
    };
};
