export type Fields<T> = Array<keyof T>;
export type Grids<T> = Array<Fields<T>>;
export type Groups<T> = { [groupName: string]: Fields<T> };
export type Tabs<T> = { [tabName: string]: Groups<T> };
