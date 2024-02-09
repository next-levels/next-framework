import {Features, META, Scope, Source} from "@next-levels/types";
import {DynamicModule, Global, Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getFeatures} from "@next-levels/next-framework";

@Global()
@Module({})
export class RootApiModule {
  static forFeature(models: any[],providers:any[] = []): DynamicModule {
    const controllers = [];
    const services = [];
    for (let model of models) {
      if (!model.prototype) {
        throw new Error('Model should be a class');
      }
      let features = this.getConfig(model);
      controllers.push(...features.controllers);
      services.push(...features.services);
      services.push(features.registryService);
    }
    return {
      imports: [TypeOrmModule.forFeature(models)],
      module: RootApiModule,
      controllers: controllers,
      providers: [...services, ...providers],
      exports: [...services, ...providers],
    };
  }

  static getConfig(model: any): any {
    const config = META.getOptionsByModel(model.prototype);
    const features = [];
    let userScope = false;

    if(config.source && config.scope && config.source === Source.SQL) {
      if (config.scope.includes(Scope.PUBLIC)) {
        features.push('app');
      }
      if (config.scope.includes(Scope.ADMIN)) {
        features.push('cms');
      }
    }

    if(config.source && config.scope &&  config.source === Source.MONGO) {
      if (config.scope.includes(Scope.PUBLIC)) {
        features.push('app');
      }
      if (config.scope.includes(Scope.ADMIN)) {
        features.push('mongo-cms');
      }
    }

    if (config.features && config.features.includes(Features.SOCKET)) {
      features.push('notification');
    }

    if (config.scope && config.scope.includes(Scope.USER)) {
      userScope = true;
    }


    return getFeatures(model, config.name, features,userScope);
  }
}
