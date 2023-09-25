"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailService = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const stream_1 = require("stream");
const src_1 = require("../../../nest-tools/src");
let ThumbnailService = class ThumbnailService {
    constructor() { }
    async serveThumbnail(file, res, width, height, type = 'png') {
        const intWidth = parseInt(width);
        const intHeight = parseInt(height);
        const fileBuffer = await this.fileToBuffer(file);
        if (!fileBuffer) {
            res.status(404).send('File not found');
            return src_1.Result.fail(new src_1.ErrorCode('FILE_NOT_FOUND', 404));
        }
        let buffer;
        if (fileBuffer && type === 'png') {
            buffer = await this.createPNG(fileBuffer, intWidth, intHeight);
        }
        if (fileBuffer && type === 'jpeg') {
            buffer = await this.createJPEG(fileBuffer, intWidth, intHeight);
        }
        const readable = this.bufferToReadableStream(buffer);
        res.setHeader('Content-Type', 'image/' + type);
        readable.pipe(res);
        return src_1.Result.ok();
    }
    async createPNG(buffer, width, height) {
        return await sharp(buffer)
            .resize(width, height, { fit: 'cover' })
            .toFormat('png')
            .toBuffer();
    }
    async createJPEG(buffer, width, height) {
        return await sharp(buffer)
            .resize(width, height, { fit: 'cover' })
            .jpeg({ quality: 80 })
            .toBuffer();
    }
    bufferToReadableStream(buffer) {
        const readableStream = new stream_1.Readable();
        readableStream.push(buffer);
        readableStream.push(null);
        return readableStream;
    }
    async fileToBuffer(file) {
        try {
            const path = 'uploads' + '/' + file.path.replace('uploads/', '');
            const data = await fs_1.promises.readFile(path);
            return data;
        }
        catch (error) {
            return null;
        }
    }
    async downloadFile(file, res) {
        const fileBuffer = await this.fileToBuffer(file);
        const readable = this.bufferToReadableStream(fileBuffer);
        res.setHeader('Content-Type', file.mime_type);
        res.setHeader('Content-Disposition', `attachment; filename=${file.name}`);
        readable.pipe(res);
        return src_1.Result.ok();
    }
};
exports.ThumbnailService = ThumbnailService;
exports.ThumbnailService = ThumbnailService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ThumbnailService);
//# sourceMappingURL=thumbnail.service.js.map