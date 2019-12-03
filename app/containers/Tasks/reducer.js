import { fromJS, Map } from 'immutable';
import initialState from './initialState';
import {
  SINGLE_TASK_START,
  SINGLE_TASK_ERROR,
  SINGLE_TASK_RESULTS,
  SAVE_TASK_START,
  SAVE_TASK_SUCCESS,
  SAVE_TASK_ERROR
} from './Drawer/constants';
import {
  FETCH_TASK_START,
  FETCH_TASK_RESULTS,
  FETCH_TASK_ERROR,
  FETCH_TASK_NEW_PAGE
} from './ListPerCase/constants';
import {
  FETCH_FILTERED_TASK_START,
  FETCH_FILTERED_TASK_RESULTS,
  FETCH_FILTERED_TASK_ERROR,
  FETCH_FILTERED_TASK_NEW_PAGE
} from './ListMyOwn/constants';
import { CHANGE_FILTER_VALUE } from './ServiceFilter/constants';
import { TASK_CHECKED } from './constants';

function updateCompletedCollection(collection, task) {
  return collection.map((item) => {
    if (item.get('id') === task.id) {
      return item.set('endedOn', task.endedOn);
    }

    return item;
  });
}

function updateCompleted(state, task) {
  return Map(state)
    .setIn(['data'], updateCompletedCollection(state.get('data'), task))
    .setIn(['fetchMyOwn', 'next-7-days', 'data'], updateCompletedCollection(state.get('fetchMyOwn').get('next-7-days').get('data'), task))
    .setIn(['fetchMyOwn', 'overdue', 'data'], updateCompletedCollection(state.get('fetchMyOwn').get('overdue').get('data'), task))
    .setIn(['fetchMyOwn', 'today', 'data'], updateCompletedCollection(state.get('fetchMyOwn').get('today').get('data'), task))
    .setIn(['search', 'results'], updateCompletedCollection(state.get('search').get('results'), task));
}

/**
 * Contact reducer
 * @function tasksReducer
 * @param {Object} state - initial state
 * @param {Object} action - object action
 * @returns {Object} new state
 */
function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TASK_START:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], true)
        .setIn(['save', 'error'], null);
    case SAVE_TASK_SUCCESS:
      return Map(state)
        .setIn(['save', 'data'], fromJS(action.data))
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], null);
    case SAVE_TASK_ERROR:
      return Map(state)
        .setIn(['save', 'loading'], false)
        .setIn(['save', 'error'], fromJS(action.error));
    case SINGLE_TASK_START:
      return Map(state)
        .setIn(['id'], action.id)
        .setIn(['single', 'data'], null)
        .setIn(['single', 'loading'], true)
        .setIn(['single', 'error'], null);
    case SINGLE_TASK_RESULTS:
      return Map(state)
        .setIn(['single', 'data'], fromJS(action.data))
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], null);
    case SINGLE_TASK_ERROR:
      return Map(state)
        .setIn(['single', 'loading'], false)
        .setIn(['single', 'error'], fromJS(action.error));
    case FETCH_TASK_START:
      return Map(state)
        .setIn(['fetch', 'loading'], true)
        .setIn(['fetch', 'error'], null);
    case FETCH_TASK_RESULTS:
      return Map(state)
        .setIn(['data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], null)
        .setIn(['fetch', 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_TASK_NEW_PAGE:
      return Map(state)
        .setIn(['fetch', 'currentPage'], action.page);
    case FETCH_TASK_ERROR:
      return Map(state)
        .setIn(['fetch', 'loading'], false)
        .setIn(['fetch', 'error'], fromJS(action.error));
    case CHANGE_FILTER_VALUE:
      return Map(state)
        .setIn(['fetch', 'serviceType'], action.to);
    case FETCH_FILTERED_TASK_START:
      return Map(state)
        .setIn(['fetchMyOwn', action.filter, 'loading'], true)
        .setIn(['fetchMyOwn', action.filter, 'error'], null);
    case FETCH_FILTERED_TASK_RESULTS:
      return Map(state)
        .setIn(['fetchMyOwn', action.filter, 'data'], fromJS(action.data.rows ? action.data.rows : []))
        .setIn(['fetchMyOwn', action.filter, 'loading'], false)
        .setIn(['fetchMyOwn', action.filter, 'error'], null)
        .setIn(['fetchMyOwn', action.filter, 'pager'], fromJS(action.data.pager ? action.data.pager : {
          current: 1,
          totalItems: 0,
          totalPages: 1
        }));
    case FETCH_FILTERED_TASK_NEW_PAGE:
      return Map(state)
        .setIn(['fetchMyOwn', action.filter, 'currentPage'], action.page);
    case FETCH_FILTERED_TASK_ERROR:
      return Map(state)
        .setIn(['fetchMyOwn', action.filter, 'loading'], false)
        .setIn(['fetchMyOwn', action.filter, 'error'], fromJS(action.error));
    case TASK_CHECKED:
      return updateCompleted(state, action.task);
    default:
      return state;
  }
}

export default tasksReducer;
