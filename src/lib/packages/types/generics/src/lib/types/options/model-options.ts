export interface ModelOptions {
  name: string;
  label?: string;
  source?: Source;
  scope?:  Scope[];
  features?: Features[];
  url?: string;
}

export enum Source {
  MONGO = 'mongo',
  SQL = 'sql'
}

export enum Scope {
  ADMIN = 'admin',
  USER = 'user',
  PUBLIC = 'public'
}

export enum Features {
  HISTORY = 'history',
  DATA = 'data',
  SOCKET = 'socket',
  CRUD = 'crud',
}
