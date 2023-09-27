import { BaseFile } from '../base-file.type';
export declare class FileEntity implements BaseFile {
    id: number;
    file_index: string;
    path: string;
    name: string;
    description: string;
    file_size: number;
    mime_type: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    field_name: string;
    attachment_id: number;
    attachment_type: string;
    sort_order: number;
    brightness: number;
}
