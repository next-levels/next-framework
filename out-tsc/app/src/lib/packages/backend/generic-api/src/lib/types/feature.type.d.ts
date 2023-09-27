import { BaseApiController } from './controller.type';
import { BaseApiService } from './service.type';
export interface FeatureType {
    controller: BaseApiController;
    service: BaseApiService;
    serviceToken: string;
}
