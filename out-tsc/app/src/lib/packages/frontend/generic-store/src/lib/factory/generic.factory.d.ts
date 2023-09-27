import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityAdapter } from '@ngrx/entity';
import { EntityPaginated, FilterOptions } from '../../../../../shared/generics/src';
import { StoreFeatureConfig } from '../types/store-feature-config.type';
type ActionType<T> = (moduleName: string) => any;
export type SelectorType<T, S> = (moduleName: string, adapter: EntityAdapter<T>) => any;
export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}
export declare function createService<T extends object>(modelUrl: string): {
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
export declare function createGenericStore<T extends object, S>(modelName: string, funcArray: Array<ActionType<T>>, selectorArray: Array<SelectorType<T, S>>, features?: string[]): {
    new (): {
        featureKey: string;
        adapter: EntityAdapter<T>;
        baseActions: any;
        baseReducers: any;
        baseSelectors: any;
    };
    getReducers(): any;
    getActions(): any;
    getSelectors(): any;
};
export declare function getStoreFeatures<T extends object, S extends object>(entity: any, config: StoreFeatureConfig<T, S>): {
    facade: {
        new (store: import("@ngrx/store").Store<S>, genericStore: any): {
            base: import("./base.facede").BaseFacade<T, S>;
            notification: import("../..").NotificationFacade<T, S>;
            selectors: Record<string, (arg: any) => Observable<any>>;
            store: import("@ngrx/store").Store<S>;
            genericStore: any;
        };
    };
    facadeToken: InjectionToken<string>;
    storeToken: InjectionToken<unknown>;
    store: {
        featureKey: string;
        adapter: EntityAdapter<T>;
        baseActions: any;
        baseReducers: any;
        baseSelectors: any;
    };
    effects: any[];
    services: {
        provide: any;
        useClass: any;
    }[];
};
export {};
