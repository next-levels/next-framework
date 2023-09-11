import { NgModule } from '@angular/core';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({})
export class GenericStoreModule {
  static forFeature<T>(
    featureKey: string,
    reducer: ActionReducer<T>,
    effects: any[]
  ) {
    return {
      ngModule: GenericStoreModule,
      imports: [
        StoreModule.forFeature(featureKey, reducer),
        EffectsModule.forFeature(effects),
      ],
    };
  }
}
