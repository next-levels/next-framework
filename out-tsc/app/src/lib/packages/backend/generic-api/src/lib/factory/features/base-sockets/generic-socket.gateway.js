"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericWebSocketGateway = void 0;
const tslib_1 = require("tslib");
const websockets_1 = require("@nestjs/websockets");
const generic_types_1 = require("@nxtlvls/generic-types");
const socket_io_1 = require("socket.io");
function GenericWebSocketGateway(entity, namespace, corsOptions, event) {
    let GenericGateway = class GenericGateway {
        constructor() { }
        afterInit(server) {
            const options = generic_types_1.META.getOptionsByModel(new entity());
            let name = '';
            if (options) {
                name = options.name;
            }
            event.on('events:' + name, (data) => {
                this.server.emit(data.method, data.data);
            });
        }
        handleConnection(client, ...args) { }
        handleDisconnect(client) {
            // Hier könnte allgemeine Logik für die Trennung eingefügt werden
        }
    };
    tslib_1.__decorate([
        (0, websockets_1.WebSocketServer)(),
        tslib_1.__metadata("design:type", socket_io_1.Server)
    ], GenericGateway.prototype, "server", void 0);
    GenericGateway = tslib_1.__decorate([
        (0, websockets_1.WebSocketGateway)({
            namespace: namespace,
            cors: corsOptions,
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GenericGateway);
    return GenericGateway;
}
exports.GenericWebSocketGateway = GenericWebSocketGateway;
//# sourceMappingURL=generic-socket.gateway.js.map