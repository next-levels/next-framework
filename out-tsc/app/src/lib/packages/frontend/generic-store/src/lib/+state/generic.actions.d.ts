import { Update } from '@ngrx/entity';
import { FilterOptions } from '../../../../../shared/generics/src';
export declare function createGenericActions<T>(entityName: string): {
    load: import("@ngrx/store").ActionCreator<`[${string} Page] Load`, () => import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load`>>;
    loadSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Success`, (props: {
        payload: any[];
    }) => {
        payload: any[];
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Success`>>;
    loadFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Fail`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Fail`>>;
    loadEntitiesFiltered: import("@ngrx/store").ActionCreator<`[${string} Page] Load Entities Filtered`, (props: {
        payload: FilterOptions;
    }) => {
        payload: FilterOptions;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Load Entities Filtered`>>;
    loadEntitiesFilteredSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Success`, (props: {
        payload: any;
    }) => {
        payload: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Success`>>;
    loadEntitiesFilteredFail: import("@ngrx/store").ActionCreator<`[${string} API] Load Entities Filtered Fail`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Load Entities Filtered Fail`>>;
    selectEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Select Entity`, (props: {
        payload: {
            entityId: number;
        };
    }) => {
        payload: {
            entityId: number;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Select Entity`>>;
    selectEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Success`, (props: {
        payload: {
            entity: T;
        };
    }) => {
        payload: {
            entity: T;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Success`>>;
    selectEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Select Entity Fail`, (props: {
        errors: any;
    }) => {
        errors: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Select Entity Fail`>>;
    addEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Add Entity`, (props: {
        payload: {
            entity: T;
        };
    }) => {
        payload: {
            entity: T;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Add Entity`>>;
    addEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Success`, (props: {
        payload: {
            entity: T;
            showPopup?: boolean;
        };
    }) => {
        payload: {
            entity: T;
            showPopup?: boolean;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Success`>>;
    addEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Add Entity Fail`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Add Entity Fail`>>;
    editEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity`, (props: {
        payload: {
            entity: Update<T>;
        };
    }) => {
        payload: {
            entity: Update<T>;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity`>>;
    editEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Success`, (props: {
        payload: {
            entity: T;
        };
    }) => {
        payload: {
            entity: T;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Success`>>;
    editEntityFail: import("@ngrx/store").ActionCreator<`[${string} Page] Edit Entity Fail`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Edit Entity Fail`>>;
    deleteEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Delete Entity`, (props: {
        payload: {
            entity: T;
        };
    }) => {
        payload: {
            entity: T;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Delete Entity`>>;
    deleteEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Success`, (props: {
        payload: {
            entity: T;
        };
    }) => {
        payload: {
            entity: T;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Success`>>;
    deleteEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Delete Entity Fail`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Delete Entity Fail`>>;
    exportEntities: import("@ngrx/store").ActionCreator<`[${string} Page] Export Entities`, (props: {
        payload: {
            entities: T[];
        };
    }) => {
        payload: {
            entities: T[];
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Export Entities`>>;
    exportEntitiesSuccess: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Success`, (props: {
        payload: {
            file: string;
        };
    }) => {
        payload: {
            file: string;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Success`>>;
    exportEntitiesFail: import("@ngrx/store").ActionCreator<`[${string} API] Export Entities Failed`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Export Entities Failed`>>;
};
