import { fromJS, Map } from 'immutable';
import initialState, { slice } from './initialState';
import {
  SEARCH_NOTE_START,
  FETCH_NOTE_START,
  FETCH_NOTE_RESULTS,
  FETCH_NOTE_ERROR,
  SINGLE_NOTE_START,
  SINGLE_NOTE_ERROR,
  SINGLE_NOTE_RESULTS,
  SAVE_NOTE_START,
  SAVE_NOTE_SUCCESS,
  SAVE_NOTE_ERROR,
  FETCH_NOTE_NEW_PAGE,
  FETCH_NOTE_NEW_LIMIT,
} from './constants';
import { WINDOW_SHOW } from '../WindowSystem/constants';

const initSlice = (original, entityId, entityType) => {
  let state = original;

  if (!state.get(entityType)) {
    state = state.set(entityType, fromJS({}));
  }

  if (!state.get(entityType).get(entityId)) {
    state = state.setIn([entityType, entityId], slice);
  }

  return state;
};

const itemReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_NOTE_START:
      return Map(state)
        .setIn(['search', 'searchValue'], action.value);
    case FETCH_NOTE_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_NOTE_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_NOTE_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_NOTE_NEW_LIMIT:
      return Map(state)
        .setIn(['limit'], action.limit);
    case FETCH_NOTE_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case SAVE_NOTE_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_NOTE_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_NOTE_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_NOTE_START:
      return Map(state)
        .setIn(['single', action.id, 'data'], null)
        .setIn(['single', action.id, 'loading'], !!action.id)
        .setIn(['single', action.id, 'error'], null);
    case SINGLE_NOTE_RESULTS:
      return Map(state)
        .setIn(['single', action.id, 'data'], fromJS(action.data))
        .setIn(['single', action.id, 'loading'], false)
        .setIn(['single', action.id, 'error'], null);
    case SINGLE_NOTE_ERROR:
      return Map(state)
        .setIn(['single', action.id, 'loading'], false)
        .setIn(['single', action.id, 'error'], fromJS(action.error));
    default:
      return null;
  }
};

const mainReducer = (original, action) => {
  const state = initSlice(original, action.entityId, action.entityType);
  const stateSlice = itemReducer(state.get(action.entityType).get(action.entityId), action);

  if (stateSlice) {
    return state.setIn([action.entityType, action.entityId], stateSlice);
  }

  return state;
};

const windowReducer = (state, { options }) => {
  return mainReducer(state, options);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WINDOW_SHOW: return windowReducer(state, action);
    case SEARCH_NOTE_START:
    case FETCH_NOTE_START:
    case FETCH_NOTE_RESULTS:
    case FETCH_NOTE_NEW_PAGE:
    case FETCH_NOTE_NEW_LIMIT:
    case FETCH_NOTE_ERROR:
    case SAVE_NOTE_START:
    case SAVE_NOTE_SUCCESS:
    case SAVE_NOTE_ERROR:
    case SINGLE_NOTE_START:
    case SINGLE_NOTE_RESULTS:
    case SINGLE_NOTE_ERROR: return mainReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
