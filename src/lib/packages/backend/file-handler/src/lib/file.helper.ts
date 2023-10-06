import { writeFile } from 'fs';
import { extname, join } from 'path';
import 'reflect-metadata';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  callback(null, generateFileName(file));
};

export function generateFileName(file) {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  return `${name}-${randomName}${fileExtName}`;
}

export const editFileNamePath = (req, file, callback) => {
  callback(null, generateFilePath(req, file));
};

export function generateFilePath(req, file) {
  const attachmentType = req.params['attachmentType'] || 'unknown';
  const attachmentId = req.params['attachmentId'] || 'unknown';
  return 'uploads/' + attachmentType + '/' + attachmentId + '/';
}

export function createArrayFromInstances<T>(...instances: T[]): T[] {
  return instances;
}

export function convertItem<T>(
  item: Partial<T>,
  classConstructor: new () => T
): T {
  const instance = new classConstructor();
  Object.assign(instance, item);
  return instance;
}

export async function decodeBase64ToFile(
  base64: string,
  fieldName: string,
  mime = 'image/png',
  type = 'png'
): Promise<Express.Multer.File> {
  if (!type.match(/(jpg|jpeg|png|gif|pdf|svg)$/)) {
    throw new Error(`Only image files are allowed!`);
  }
  const fileBuffer = Buffer.from(base64, 'base64');
  const filename = `${Date.now()}_${fieldName}.${type}`; // Customize filename as needed
  const mimeType = mime; // Set mimeType based on the actual file type
  const fileDestination = './uploads/frontenduser';
  const filePath = join(fileDestination, filename);

  await writeFileAsync(filePath, fileBuffer);

  return {
    originalname: filename,
    filename: filename,
    path: filePath,
    mimetype: mimeType,
    size: fileBuffer.length,
  } as Express.Multer.File;
}

function writeFileAsync(filePath: string, data: any): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    writeFile(filePath, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
