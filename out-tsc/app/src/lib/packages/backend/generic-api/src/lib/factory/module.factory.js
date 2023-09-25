"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatures = void 0;
const controller_factory_1 = require("./features/base-cms/controller.factory");
const service_factory_1 = require("./features/base-cms/service.factory");
const controller_factory_2 = require("./features/base-app/controller.factory");
const service_factory_2 = require("./features/base-app/service.factory");
const hook_regestry_1 = require("../helpers/hook.regestry");
const generic_socket_gateway_1 = require("./features/base-sockets/generic-socket.gateway");
const event_emitter_1 = require("@nestjs/event-emitter");
const globalEventEmitter = new event_emitter_1.EventEmitter2();
function getFeatures(entity, route, features = [], userScope) {
    const featureList = [];
    const registryServiceToken = `${entity.name}RegistryService`;
    const hookRegistry = new hook_regestry_1.HookRegistryService();
    for (const feature of features) {
        const featureType = getFeature(entity, route, feature, registryServiceToken, userScope);
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
exports.getFeatures = getFeatures;
function getFeature(entity, route, feature, registryServiceToken, userScope) {
    const serviceToken = `${entity.name}${feature}Service`;
    const config = {
        entity,
        route,
        serviceToken,
    };
    switch (feature) {
        case 'cms':
            return {
                controller: (0, controller_factory_1.GenericBaseCMSControllerCreator)(config, globalEventEmitter),
                service: (0, service_factory_1.GenericBaseCMSService)(entity),
                serviceToken: serviceToken,
            };
        case 'app':
            return {
                controller: (0, controller_factory_2.GenericBaseApiControllerCreator)(config, globalEventEmitter),
                service: (0, service_factory_2.GenericBaseApiService)(entity, registryServiceToken, userScope),
                serviceToken: serviceToken,
            };
        case 'notification':
            return {
                controller: (0, controller_factory_2.GenericBaseApiControllerCreator)(config),
                service: (0, generic_socket_gateway_1.GenericWebSocketGateway)(entity, `${route}`, {
                    origin: ['http://localhost:4200', 'https://some-website.com'],
                    credentials: true,
                }, globalEventEmitter),
                serviceToken: serviceToken,
            };
        default:
            throw new Error(`Feature ${feature} not found`);
    }
}
//# sourceMappingURL=module.factory.js.map