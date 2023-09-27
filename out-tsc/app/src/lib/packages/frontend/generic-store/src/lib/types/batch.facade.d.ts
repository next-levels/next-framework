export interface BatchFacade<EntityType> {
    batchEdit(ids: number[], partial: EntityType): void;
}
