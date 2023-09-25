"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendJwtAuthGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let FrontendJwtAuthGuard = class FrontendJwtAuthGuard extends (0, passport_1.AuthGuard)('frontend-jwt') {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        request.isJwtFrontendProtected = true;
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        return user;
    }
};
exports.FrontendJwtAuthGuard = FrontendJwtAuthGuard;
exports.FrontendJwtAuthGuard = FrontendJwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FrontendJwtAuthGuard);
//# sourceMappingURL=frontend-jwt-auth.guard.js.map