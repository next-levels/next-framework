"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64ToFile = exports.convertItem = exports.createArrayFromInstances = exports.generateFilePath = exports.editFileNamePath = exports.generateFileName = exports.editFileName = exports.imageFileFilter = void 0;
const path_1 = require("path");
require("reflect-metadata");
const promises_1 = require("fs/promises");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const editFileName = (req, file, callback) => {
    callback(null, generateFileName(file));
};
exports.editFileName = editFileName;
function generateFileName(file) {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    return `${name}-${randomName}${fileExtName}`;
}
exports.generateFileName = generateFileName;
const editFileNamePath = (req, file, callback) => {
    callback(null, generateFilePath(req, file));
};
exports.editFileNamePath = editFileNamePath;
function generateFilePath(req, file) {
    const attachmentType = req.params['attachmentType'] || 'unknown';
    const attachmentId = req.params['attachmentId'] || 'unknown';
    return 'uploads/' + attachmentType + '/' + attachmentId + '/';
}
exports.generateFilePath = generateFilePath;
function createArrayFromInstances(...instances) {
    return instances;
}
exports.createArrayFromInstances = createArrayFromInstances;
function convertItem(item, classConstructor) {
    const instance = new classConstructor();
    Object.assign(instance, item);
    return instance;
}
exports.convertItem = convertItem;
async function decodeBase64ToFile(base64, fieldName, mime = 'image/png', type = 'png') {
    if (!type.match(/(jpg|jpeg|png|gif|pdf|svg)$/)) {
        throw new Error(`Only image files are allowed!`);
    }
    const fileBuffer = Buffer.from(base64, 'base64');
    const filename = `${Date.now()}_${fieldName}.${type}`; // Customize filename as needed
    const mimeType = mime; // Set mimeType based on the actual file type
    const fileDestination = './uploads/frontenduser';
    const filePath = (0, path_1.join)(fileDestination, filename);
    await (0, promises_1.writeFile)(filePath, fileBuffer);
    return {
        originalname: filename,
        filename: filename,
        path: filePath,
        mimetype: mimeType,
        size: fileBuffer.length,
    };
}
exports.decodeBase64ToFile = decodeBase64ToFile;
//# sourceMappingURL=file.helper.js.map