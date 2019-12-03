import { fromJS } from 'immutable';
import initialState from './initialState';
import {
  WINDOW_SHOW,
  WINDOW_HIDE,
  WINDOW_CLOSE
} from './constants';

const has = (key, state) => !state.filter((window) => window.get('key') === key).size;

const updateWindowVisibility = (state, key, visibility) => state.map((item) => {
  if (item.get('key') === key) {
    return item.set('state', visibility);
  }

  return item.set('state', 'hidden');
});

const openWindow = (state, type, key, options) => {
  const newItem = fromJS({
    state: 'visible',
    key,
    options
  });

  return updateWindowVisibility(!has(key, state) ? state : state.unshift(newItem), key, 'visible');
};

function reducer(state = initialState, { type, key, options }) {
  switch (type) {
    case WINDOW_SHOW:
      return openWindow(state, type, key, options);
    case WINDOW_HIDE:
      return updateWindowVisibility(state, key, 'hidden');
    case WINDOW_CLOSE:
      return state.filter((item) => item.get('key') !== key);
    default:
      return state;
  }
}

export default reducer;
