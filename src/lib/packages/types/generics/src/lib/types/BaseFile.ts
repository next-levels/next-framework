export interface BaseFile {
  id?: number;
  file_index?: string;
  name: string;
  path?: string;
  mime_type?: string;
  type?: string;
  description?: string;
  file_size: number;

  sort_order?: number;
  is_cover_image?: boolean;

  brightness?: number;
  created_at?: Date;
  updated_at?: Date;
}
