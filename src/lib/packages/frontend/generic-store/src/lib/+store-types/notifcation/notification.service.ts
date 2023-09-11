export interface NotificationService<EntityType extends object> {
  setEntity(entity: EntityType): void;
  resetEntity(): void;
}
