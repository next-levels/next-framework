"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileGuard = void 0;
const common_1 = require("@nestjs/common");
class FileGuard {
    constructor(fieldName, localOptions = { isOptional: false }) {
        this.fieldName = fieldName;
        this.localOptions = localOptions;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const body = request?.body;
        const file = body[this.fieldName];
        if (!file && !this.localOptions.isOptional) {
            throw new common_1.HttpException('File is required', common_1.HttpStatus.BAD_REQUEST);
        }
        return true;
    }
}
exports.FileGuard = FileGuard;
//# sourceMappingURL=file.guard.js.map