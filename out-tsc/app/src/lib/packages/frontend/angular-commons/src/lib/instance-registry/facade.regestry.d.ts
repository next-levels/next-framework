export declare class InstanceRegistryService {
    private instanceMap;
    register(model: any, instance: any): void;
    retrieve(model: any): typeof model | undefined;
}
