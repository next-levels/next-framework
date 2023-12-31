import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';

import { Server } from 'socket.io';
import {META} from "@next-levels/types";

export function GenericWebSocketGateway(
  entity: any,
  namespace: string,
  corsOptions: any,
  event: any
): any {
  @WebSocketGateway({
    namespace: namespace,
    cors: corsOptions,
  })
  class GenericGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
  {
    @WebSocketServer()
    server: Server;

    constructor() {
      console.log('GenericGateway', namespace);
    }

    afterInit(server: Server) {
      console.log('entity:' + entity)

      if (entity){
        const options = META.getOptionsByModel(new entity());
        let name = '';
        if (options) {
          name = options.name;
        }

        event.on('events:' + name, (data) => {
          this.server.emit(data.method, data.data);
        });
      }else {
        console.log('events:' + namespace)
        event.on('events:' + namespace, (data) => {
          console.log('events:' + namespace, data)
          this.server.emit(data.method, data.data);
        });      }

    }

    handleConnection(client: any, ...args: any[]): any {
     }

    handleDisconnect(client: any): any {
      // Hier könnte allgemeine Logik für die Trennung eingefügt werden
    }
  }
  return GenericGateway;
}
