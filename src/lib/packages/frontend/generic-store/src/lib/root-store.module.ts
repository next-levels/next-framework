import {
  NgModule,
  ModuleWithProviders,
  Type,
  InjectionToken,
  Inject,
  forwardRef,
} from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment, InstanceRegistryService } from '@nxtlvls/angular-commons';
import {
  GenericData,
  getStoreFeatures,
  NotificationData,
} from '@nxtlvls/generic-store';
import { META } from '@nxtlvls/generic-types';
import { EnvironmentStorageService } from '../../../../shared/generics/src';

@NgModule({})
export class RootStoreModule {
  count = 0;
  constructor(private environmentStorage: EnvironmentStorageService) {}

  static forFeature(model: Type<any>): ModuleWithProviders<RootStoreModule> {
    const providers: any[] = [];
    const imports = [];
    let config = META.getOptionsByModel(model.prototype);
    const apiUrl = `${this.environmentStorage.baseUrl}/${config.url}`; // wird später aktualisiert

    const store = getStoreFeatures<
      typeof model,
      {
        base: GenericData<typeof model>;
        notifications: NotificationData<typeof model>;
      }
    >(model, {
      ...config,
      route: apiUrl,
    });

    providers.push({
      provide: store.storeToken,
      useValue: store.store,
    });

    providers.push({
      provide: store.facadeToken,
      useClass: store.facade,
      deps: [Store, store.storeToken],
    });

    providers.push(...store.services, ...store.effects);

    @NgModule({
      imports: [
        StoreModule.forFeature(
          store.store.featureKey,
          store.store.baseReducers
        ),
        EffectsModule.forFeature([...store.effects]),
      ],
    })
    class DynamicStoreModule {
      constructor(
        private registry: InstanceRegistryService,
        public NGRXstore: Store<any>
      ) {
        this.registry.register(model, new store.facade(NGRXstore, store.store));
      }
    }

    return {
      ngModule: DynamicStoreModule,
      providers,
    };
  }
}
