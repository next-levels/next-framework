import { ActionReducer, combineReducers } from '@ngrx/store';
import { createBaseReducers } from '../+state/base.reducers';
import { createNotificationReducer } from '../+store-types/notifcation/notification.reducers';

type ReducerMapType = {
  [key: string]: ActionReducer<any> | undefined;
};

export function createReducers(
  keys: string[],
  entityName: string,
  baseActions: any,
  baseEntityAdapter: any
): ActionReducer<any> {
  const reducers: { [key: string]: ActionReducer<any> } = {};

  for (const key of keys) {
    let reducer;
    switch (key) {
      case 'base':
        reducer = createBaseReducers(
          entityName,
          baseActions,
          baseEntityAdapter
        );
        break;
      case 'notifications':
        reducer = createNotificationReducer(
          entityName,
          baseActions,
          baseEntityAdapter
        );
        break;
      // add more cases as necessary
      default:
        // console.info(`No reducer found for key "${key}"`);
        break;
    }
    if (reducer) {
      reducers[key] = reducer;
    }
  }

  return combineReducers(reducers);
}
