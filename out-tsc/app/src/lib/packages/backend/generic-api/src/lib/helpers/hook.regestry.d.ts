export declare class HookRegistryService {
    private hooks;
    registerHook<T>(key: string, hook: (entity: T) => T): void;
    getHook<T>(key: string): (entity: T) => T;
}
