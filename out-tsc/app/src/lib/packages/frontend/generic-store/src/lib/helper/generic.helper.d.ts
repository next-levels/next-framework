import { EntityAdapter } from '@ngrx/entity';
import { GenericData } from '../types/generic.data';
import { createGenericActions } from '../+state/generic.actions';
export declare function createGenericAdapter<EntityType>(): EntityAdapter<EntityType>;
export declare function createGenericInitialState<EntityType>(entityActions: ReturnType<typeof createGenericActions>, entityAdapter: EntityAdapter<EntityType>): GenericData<EntityType>;
