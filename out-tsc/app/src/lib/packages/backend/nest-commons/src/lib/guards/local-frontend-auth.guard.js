"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendAuthGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let FrontendAuthGuard = class FrontendAuthGuard extends (0, passport_1.AuthGuard)('local-frontend') {
    handleRequest(error, user) {
        if (error && error.status === 409) {
            throw error;
        }
        if (error || !user) {
            throw new common_1.HttpException('', common_1.HttpStatus.FORBIDDEN);
        }
        return user;
    }
};
exports.FrontendAuthGuard = FrontendAuthGuard;
exports.FrontendAuthGuard = FrontendAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], FrontendAuthGuard);
//# sourceMappingURL=local-frontend-auth.guard.js.map