import { Map } from 'immutable';
import initialState from './initialState';
import {
  DRAWER_SHOW,
  DRAWER_HIDE
} from './constants';

function reducer(state = initialState, action) {
  switch (action.type) {
    case DRAWER_SHOW:
      return Map(state)
        .set(action.drawerName, true);
    case DRAWER_HIDE:
      return Map(state)
        .set(action.drawerName, false);
    default:
      return state;
  }
}

export default reducer;
