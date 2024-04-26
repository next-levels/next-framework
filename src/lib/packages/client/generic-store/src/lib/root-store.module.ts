import {NgModule, ModuleWithProviders, Type} from '@angular/core';
import {Store, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {
  InstanceRegistryService,
} from '../../../angular-commons';
import {getStoreFeatures} from './factory/generic.factory';
import {GenericData} from './types/generic.data';
import {NotificationData} from "./+store-types/notifcation/notification.data";
import {META} from "@next-levels/types";

@NgModule({})
export class RootStoreModule {
  static forFeature(model: Type<any>): ModuleWithProviders<RootStoreModule> {
    const providers: any[] = [];
    const imports = [];
    let config = META.getOptionsByModel(model.prototype);

    const name = META.getOptionsByModel(model.prototype).name;
    const url = META.getOptionsByModel(model.prototype).url;
    const route = url ? url : name;
    const apiUrl = `/api/${route}/admin`;

    const store = getStoreFeatures<
      typeof model,
      {
        base: GenericData<typeof model>;
        notifications: NotificationData<typeof model>;
      }
    >(model, {
      ...config,
      route: apiUrl,
      features: ['base', 'notifications'],
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
