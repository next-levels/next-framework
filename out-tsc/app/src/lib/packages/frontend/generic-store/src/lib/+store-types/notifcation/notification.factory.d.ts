import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { NotificationService } from './notification.service';
import { NotificationData } from './notification.data';
import { NotificationFacade } from './notification.facede';
import { Observable } from 'rxjs';
import { EffectsConfig } from '../../types/effects-config.type';
export declare function createNotificationService<T extends object>(modelUrl: string): {
    new (_http: HttpClient): {
        _http: HttpClient;
        resetEntity(): void;
        setEntity(entity: T): void;
    };
};
export declare function createNotificationStore<T extends object>(modelName: string): {
    new (): {
        featureKey: string;
        adapter: import("@ngrx/entity").EntityAdapter<T>;
        baseActions: {
            setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
                payload: T;
            }) => {
                payload: T;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
            setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
                payload: T;
            }) => {
                payload: T;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
            setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
            setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
                payload: {
                    count: number;
                };
            }) => {
                payload: {
                    count: number;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
            resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
                payload: any;
            }) => {
                payload: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
        };
        baseReducers: (entityName: string, actions: {
            setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
                payload: T;
            }) => {
                payload: T;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
            setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
                payload: T;
            }) => {
                payload: T;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
            setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
            setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
                payload: {
                    count: number;
                };
            }) => {
                payload: {
                    count: number;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
            resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
                payload: any;
            }) => {
                payload: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
        }, entityAdapter: import("@ngrx/entity").EntityAdapter<T>) => import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<T>, import("@ngrx/store").Action>;
        baseSelectors: (featureKey: string, entityAdapter: import("@ngrx/entity").EntityAdapter<T>) => any;
        entityName: string;
        readonly baseReducer: import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<T>, import("@ngrx/store").Action>;
    };
    getReducers(): (entityName: string, actions: {
        setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
            payload: T;
        }) => {
            payload: T;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
        setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
            payload: T;
        }) => {
            payload: T;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
        setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
            error: any;
        }) => {
            error: any;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
        setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
            payload: {
                count: number;
            };
        }) => {
            payload: {
                count: number;
            };
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
        resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
            payload: any;
        }) => {
            payload: any;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
    }, entityAdapter: import("@ngrx/entity").EntityAdapter<T>) => import("@ngrx/store").ActionReducer<import("@ngrx/entity").EntityState<T>, import("@ngrx/store").Action>;
    getActions(): {
        setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
            payload: T;
        }) => {
            payload: T;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
        setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
            payload: T;
        }) => {
            payload: T;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
        setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
            error: any;
        }) => {
            error: any;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
        setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
            payload: {
                count: number;
            };
        }) => {
            payload: {
                count: number;
            };
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
        resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
            payload: any;
        }) => {
            payload: any;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
    };
    getSelectors(): (featureKey: string, entityAdapter: import("@ngrx/entity").EntityAdapter<T>) => any;
};
export declare function createNotificationEffects<T extends object>(serviceToken: InjectionToken<NotificationService<T>>, actions: any, modelName: string): {
    new (actions$: Actions, service: NotificationService<T>): {
        actions$: Actions;
        service: NotificationService<T>;
        entityActions: any;
        modelName: string;
        setEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
        loadEntitiesSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
    };
};
export declare function createNotificationFacade2<T>(storeClass: any, actions: any, selectors: any): NotificationFacade<T, NotificationData<T>> | {
    new (store: Store<NotificationData<T>>): {
        store: Store<NotificationData<T>>;
        unReadCount$: Observable<number>;
        updated$: Observable<number>;
        baseActions: {
            setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
                payload: T;
            }) => {
                payload: T;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
            setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
                payload: T;
            }) => {
                payload: T;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
            setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
                error: any;
            }) => {
                error: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
            setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
                payload: {
                    count: number;
                };
            }) => {
                payload: {
                    count: number;
                };
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
            resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
                payload: any;
            }) => {
                payload: any;
            } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
        };
        baseSelectors: import("./notification.facede").NotificationTypeSelectors<T, NotificationData<T>>;
        setEntity(entity: T): void;
        resetCount(entity: T): void;
    };
};
export declare function createNotificationFacade<T, S>(storeClass: any, actions: any, selectors: any): {
    unReadCount$: Observable<number>;
    store: Store<S>;
    setEntity(entity: T): void;
    updated$: Observable<number>;
    baseActions: {
        setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
            payload: T;
        }) => {
            payload: T;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
        setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
            payload: T;
        }) => {
            payload: T;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
        setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
            error: any;
        }) => {
            error: any;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
        setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
            payload: {
                count: number;
            };
        }) => {
            payload: {
                count: number;
            };
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
        resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
            payload: any;
        }) => {
            payload: any;
        } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
    };
    baseSelectors: import("./notification.facede").NotificationTypeSelectors<T, S>;
    resetCount(entity: T): void;
};
export declare function createNotificationEffectServicePair<T extends object>(config: EffectsConfig): {
    serviceToken: InjectionToken<any>;
    service: {
        new (_http: HttpClient): {
            _http: HttpClient;
            resetEntity(): void;
            setEntity(entity: T): void;
        };
    };
    effect: {
        new (actions$: Actions<import("@ngrx/store").Action>, service: NotificationService<T>): {
            actions$: Actions<import("@ngrx/store").Action>;
            service: NotificationService<T>;
            entityActions: any;
            modelName: string;
            setEntity$: Observable<import("@ngrx/store").Action> & import("@ngrx/effects").CreateEffectMetadata;
            loadEntitiesSuccess$: Observable<any> & import("@ngrx/effects").CreateEffectMetadata;
        };
    };
};
