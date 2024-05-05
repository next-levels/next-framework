import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InstanceRegistryService } from '../../../angular-commons';
import { getStoreFeatures } from './factory/generic.factory';
import { GenericData } from './types/generic.data';
import { NotificationData } from './+store-types/notifcation/notification.data';
import { Features, META } from '@next-levels/types';

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
    const features = [];
    let store = null;

    if (config && config.features && config.features.length > 0) {
      features.push('base');

      if (config.features.includes(Features.SOCKET)) {
        features.push('notifications');
      }

      store = getStoreFeatures<
        typeof model,
        {
          base: GenericData<typeof model>;
          notifications: NotificationData<typeof model>;
        }
      >(model, {
        ...config,
        route: apiUrl,
        features: features,
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

      imports.push(
        StoreModule.forFeature(store.store.featureKey, store.store.baseReducers)
      );
      imports.push(EffectsModule.forFeature([...store.effects]));
    }

    @NgModule({
      imports: imports,
    })
    class DynamicStoreModule {
      constructor(
        private registry: InstanceRegistryService,
        public NGRXstore: Store<any>
      ) {
        const model_options = META.getOptionsByModel(model.prototype);
        if (
          model_options &&
          model_options.features &&
          model_options.features.length > 0
        ) {
          this.registry.register(
            model,
            new store.facade(NGRXstore, store.store)
          );
        }
      }
    }

    return {
      ngModule: DynamicStoreModule,
      providers,
    };
  }
}
