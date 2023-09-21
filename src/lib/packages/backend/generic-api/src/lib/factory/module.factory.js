"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatures = void 0;
var controller_factory_1 = require("./features/base-cms/controller.factory");
var service_factory_1 = require("./features/base-cms/service.factory");
var controller_factory_2 = require("./features/base-app/controller.factory");
var service_factory_2 = require("./features/base-app/service.factory");
var hook_regestry_1 = require("../helpers/hook.regestry");
var generic_socket_gateway_1 = require("./features/base-sockets/generic-socket.gateway");
var event_emitter_1 = require("@nestjs/event-emitter");
var globalEventEmitter = new event_emitter_1.EventEmitter2();
function getFeatures(entity, route, features, userScope) {
    if (features === void 0) { features = []; }
    var featureList = [];
    var registryServiceToken = "".concat(entity.name, "RegistryService");
    var hookRegistry = new hook_regestry_1.HookRegistryService();
    for (var _i = 0, features_1 = features; _i < features_1.length; _i++) {
        var feature = features_1[_i];
        var featureType = getFeature(entity, route, feature, registryServiceToken, userScope);
        if (featureType) {
            featureList.push(featureType);
        }
    }
    return {
        controllers: featureList.map(function (pair) { return pair.controller; }),
        services: featureList.map(function (pair) { return ({
            provide: pair.serviceToken,
            useClass: pair.service,
        }); }),
        registryService: {
            provide: registryServiceToken,
            useValue: hookRegistry,
        },
    };
}
exports.getFeatures = getFeatures;
function getFeature(entity, route, feature, registryServiceToken, userScope) {
    var serviceToken = "".concat(entity.name).concat(feature, "Service");
    var config = {
        entity: entity,
        route: route,
        serviceToken: serviceToken,
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
                service: (0, generic_socket_gateway_1.GenericWebSocketGateway)(entity, "".concat(route), {
                    origin: ['http://localhost:4200', 'https://some-website.com'],
                    credentials: true,
                }, globalEventEmitter),
                serviceToken: serviceToken,
            };
        default:
            throw new Error("Feature ".concat(feature, " not found"));
    }
}
