export const PropertyTag = {
  primary: 'primary',
  uuid: 'uuid',
  increment: 'increment',
  virtual: 'virtual',
  created_at: 'created_at',
  updated_at: 'updated_at',
  index: 'index',
  system: 'system',
} as const;

type TagTypesKey = keyof typeof PropertyTag;
export type PropertyTagType = (typeof PropertyTag)[TagTypesKey];
