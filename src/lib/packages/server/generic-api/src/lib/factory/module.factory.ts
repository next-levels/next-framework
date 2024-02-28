import { Type } from '@nestjs/common';
import { FeatureType } from '../types/feature.type';
import { ControllerConfig } from '../types/controller-config.type';

import { GenericBaseCMSControllerCreator } from './features/base-cms/controller.factory';
import { GenericBaseCMSService } from './features/base-cms/service.factory';
import { GenericBaseApiControllerCreator } from './features/base-app/controller.factory';
import { GenericBaseApiService } from './features/base-app/service.factory';
import { HookRegistryService } from '../helpers/hook.regestry';
import { GenericWebSocketGateway } from './features/base-sockets/generic-socket.gateway';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GenericBaseCMSControllerCreatorMongo } from './features/base-cms-mongo/controller.factory';
import { GenericBaseCMSServiceMongo } from './features/base-cms-mongo/service-mongo.factory';

const globalEventEmitter = new EventEmitter2();
export function getFeatures<T extends Type<any>>(
  entity: T,
  route: string,
  features: string[] = [],
  userScope?: boolean
): any {
  const featureList: FeatureType[] = [];

  const registryServiceToken = `${entity.name}RegistryService`;
  const hookRegistry = new HookRegistryService();

  for (const feature of features) {
    const featureType = getFeature(
      entity,
      route,
      feature,
      registryServiceToken,
      userScope
    );

    if (featureType) {
      featureList.push(featureType);
    }
  }

  return {
    controllers: featureList.map((pair) => pair.controller),
    services: featureList.map((pair) => ({
      provide: pair.serviceToken,
      useClass: pair.service,
    })),
    registryService: {
      provide: registryServiceToken,
      useValue: hookRegistry,
    },
  };
}

function getFeature(
  entity: Type<any>,
  route: string,
  feature: string,
  registryServiceToken: any,
  userScope?: boolean
): FeatureType {
  const serviceToken = `${entity.name}${feature}Service`;
  const config: ControllerConfig = {
    entity,
    route,
    serviceToken,
  };

  switch (feature) {
    case 'cms':
      return {
        controller: GenericBaseCMSControllerCreator(config, globalEventEmitter),
        service: GenericBaseCMSService(entity),
        serviceToken: serviceToken,
      };
    case 'cms-mongo':
      return {
        controller: GenericBaseCMSControllerCreatorMongo(
          config,
          globalEventEmitter
        ),
        service: GenericBaseCMSServiceMongo(entity),
        serviceToken: serviceToken,
      };
    case 'app':
      return {
        controller: GenericBaseApiControllerCreator(config, globalEventEmitter),
        service: GenericBaseApiService(entity, registryServiceToken, userScope),
        serviceToken: serviceToken,
      };
    case 'notification':
      return {
        controller: GenericBaseApiControllerCreator(config),
        service: GenericWebSocketGateway(
          entity,
          `${route}`,
          {
            origin: ['http://localhost:4200',process.env['CMS_URL'], 'http://localhost:4222'],
            credentials: true,
          },
          globalEventEmitter
        ),
        serviceToken: serviceToken,
      };
    default:
      throw new Error(`Feature ${feature} not found`);
  }
}
