export interface BaseFile {
  id?: string;
  file_index?: string;
  name: string;
  path?: string;
  mime_type?: string;
  type?: string;
  description?: string;
  file_size: number;

  sort_order?: number;
  is_cover_image?: boolean;
  local: boolean;

  brightness?: number;
  created_at?: Date;
  updated_at?: Date;
}
