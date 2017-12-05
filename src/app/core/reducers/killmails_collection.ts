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
    case killmails.LOAD:
    case killmails.GET: {
      return {
        ...state,
        loading: true,
      };
    }

    case killmails.LOAD_SUCCESS:
    case killmails.GET_SUCCESS: {
      return {
        loaded: true,
        loading: false,
        ids: action.payload.map(killmail => killmail.killmail_id),
      };
    }

    case killmails.ADD_KILLMAILS_SUCCESS: {
      const ids = action.payload.reduce((acc, killmail) => {
        if (state.ids.indexOf(killmail.killmail_id) === -1) {
          acc.push(killmail.killmail_id);
        }

        return acc;
      }, []);

      return {
        ...state,
        ids: [...state.ids, ...ids],
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
