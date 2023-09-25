"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHeader = void 0;
const common_1 = require("@nestjs/common");
exports.CustomHeader = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers['nxt-model-lang'];
});
//# sourceMappingURL=custom-header.decorator.js.map