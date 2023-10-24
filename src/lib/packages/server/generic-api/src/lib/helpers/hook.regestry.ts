import { Injectable } from '@nestjs/common';

@Injectable()
export class HookRegistryService {
  private hooks: { [key: string]: (entity: any) => any } = {};

  registerHook<T>(key: string, hook: (entity: T) => T) {
    this.hooks[key] = hook;
  }

  getHook<T>(key: string): (entity: T) => T {
    return this.hooks[key];
  }
}
