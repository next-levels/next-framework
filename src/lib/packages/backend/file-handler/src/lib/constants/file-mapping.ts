export const fileMapping = {
 } as const;

type fileMappingKey = keyof typeof fileMapping;
export type FileMapping = (typeof fileMapping)[fileMappingKey];
