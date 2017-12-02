import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../shared/utils';
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */

import * as fromLayout from '../core/reducers/layout';
import * as fromKillmails from '../core/reducers/killmails';
import * as fromCollection from '../core/reducers/killmails_collection';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  killmails: fromKillmails.State;
  killmails_collection: fromCollection.State;
  layout: fromLayout.State;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  killmails: fromKillmails.reducer,
  killmails_collection: fromCollection.reducer,
  layout: fromLayout.reducer,
  routerReducer: fromRouter.routerReducer,
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, storeFreeze]
  : [];

/**
 * Layout Reducers
 */
export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);


export const getKillmailsState = createFeatureSelector<fromKillmails.State>('killmails');

export const getSelectedKillmailId = createSelector(
  getKillmailsState,
  fromKillmails.getSelectedId
);

export const {
  selectIds: getKillmailIds,
  selectEntities: getKillmailEntities,
  selectAll: getAllKillmails,
  selectTotal: getTotalKillmails,
} = fromKillmails.adapter.getSelectors(getKillmailsState);

export const getSelectedKillmail = createSelector(
  getKillmailEntities,
  getSelectedKillmailId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getCollectionState = createFeatureSelector<fromCollection.State>('killmails_collection');

export const getCollectionLoaded = createSelector(
  getCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  getCollectionState,
  fromCollection.getLoading
);
export const getCollectionKillmailIds = createSelector(
  getCollectionState,
  fromCollection.getIds
);

export const getKillmailCollection = createSelector(
  getKillmailEntities,
  getCollectionKillmailIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);

export const isSelectedKillmailInCollection = createSelector(
  getCollectionKillmailIds,
  getSelectedKillmailId,
  (ids, selected) => {
    return ids.indexOf(selected) > -1;
  }
);
