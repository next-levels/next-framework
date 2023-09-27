import { FileEntity } from '../entities/file.entity';
export declare class FileDto {
    id?: number;
    name: string;
    path: string;
    mime_type: string;
    type: string;
    description?: string;
    file_index: string;
    file_size: number;
    sort_order?: number;
    brightness?: number;
    static fromFile(uploadedFile: any): FileEntity;
}
