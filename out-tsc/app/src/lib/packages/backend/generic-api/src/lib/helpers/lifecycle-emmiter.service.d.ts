import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class LifecycleEmitterService {
    event: EventEmitter2;
    triggerEvent(model: any, method: string, data: any): void;
}
