import * as killmails from '../actions/killmails_collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export function reducer(state = initialState, action: killmails.Actions): State {
  switch (action.type) {
    case killmails.LOAD: {
      return {
        ...state,
        loading: true,
      };
    }

    case killmails.LOAD_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        ids: action.payload.map(killmail => killmail.killmail_id),
      };
    }

    case killmails.ADD_KILLMAIL_SUCCESS: {
      if (state.ids.indexOf(action.payload.killmail_id) > -1) {
        return state;
      }

      return {
        ...state,
        ids: [...state.ids, action.payload.killmail_id],
      };
    }

    case killmails.ADD_KILLMAIL_FAIL: {
      return {
        ...state,
        ids: state.ids.filter(id => id !== action.payload.killmail_id),
      };
    }

    default: {
      return state;
    }
  }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
