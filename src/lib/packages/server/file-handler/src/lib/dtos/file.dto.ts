import { FileEntity } from '../entities/file.entity';

export class FileDto {
  id?: string;
  name: string;
  path: string;
  mime_type: string;
  type: string;
  description?: string;
  file_index: string;
  file_size: number;

  sort_order?: number;

  brightness?: number;

  static fromFile(uploadedFile: any): FileEntity {
    const file = new FileEntity();

    file.name = uploadedFile.filename;
    file.path = uploadedFile.path;
    file.mime_type = uploadedFile.mimetype;
    file.type = uploadedFile.mimetype;
    file.file_index = uploadedFile.filename;
    file.file_size = uploadedFile.size;

    return file;
  }
}
