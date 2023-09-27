import { createAction } from '@ngrx/store';
export declare function createNotificationActions<EntityType>(entityName: string): {
    setEntity: import("@ngrx/store").ActionCreator<`[${string} Page] Set Entity`, (props: {
        payload: EntityType;
    }) => {
        payload: EntityType;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} Page] Set Entity`>>;
    setEntitySuccess: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Success`, (props: {
        payload: EntityType;
    }) => {
        payload: EntityType;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Success`>>;
    setEntityFail: import("@ngrx/store").ActionCreator<`[${string} API] Set Entity Fail`, (props: {
        error: any;
    }) => {
        error: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Entity Fail`>>;
    setCount: import("@ngrx/store").ActionCreator<`[${string} API] Set Count Entity Fail`, (props: {
        payload: {
            count: number;
        };
    }) => {
        payload: {
            count: number;
        };
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Set Count Entity Fail`>>;
    resetCount: import("@ngrx/store").ActionCreator<`[${string} API] Reset Count Entity Fail`, (props: {
        payload: any;
    }) => {
        payload: any;
    } & import("@ngrx/store/src/models").TypedAction<`[${string} API] Reset Count Entity Fail`>>;
};
export type NotificationActions<EntityType> = {
    resetCount: ReturnType<typeof createAction>;
    setCount: ReturnType<typeof createAction>;
    setEntityFail: ReturnType<typeof createAction>;
    setEntitySuccess: ReturnType<typeof createAction>;
    setEntity: ReturnType<typeof createAction>;
};
