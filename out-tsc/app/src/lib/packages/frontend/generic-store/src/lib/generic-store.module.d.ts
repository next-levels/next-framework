import { ActionReducer } from '@ngrx/store';
export declare class GenericStoreModule {
    static forFeature<T>(featureKey: string, reducer: ActionReducer<T>, effects: any[]): {
        ngModule: typeof GenericStoreModule;
        imports: import("@angular/core").ModuleWithProviders<import("@ngrx/effects").EffectsFeatureModule>[];
    };
}
