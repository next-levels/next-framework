"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDto = void 0;
const file_entity_1 = require("../entities/file.entity");
class FileDto {
    static fromFile(uploadedFile) {
        const file = new file_entity_1.FileEntity();
        file.name = uploadedFile.filename;
        file.path = uploadedFile.path;
        file.mime_type = uploadedFile.mimetype;
        file.type = uploadedFile.mimetype;
        file.file_index = uploadedFile.filename;
        file.file_size = uploadedFile.size;
        return file;
    }
}
exports.FileDto = FileDto;
//# sourceMappingURL=file.dto.js.map