import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { META } from 'src/lib/packages/shared/generics/src/lib/helpers/meta-data.helper';

@Injectable()
export class LifecycleEmitterService {
  event = new EventEmitter2();

  triggerEvent(model: any, method: string, data: any) {
    const options = META.getOptionsByModel(new model());
    let name = '';
    if (options) {
      name = options.name;
    }
    this.event.emit('events:' + name, { method: method, data: data });
  }
}
