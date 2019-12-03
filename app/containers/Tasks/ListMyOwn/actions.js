import {
  FETCH_FILTERED_TASK_START,
  FETCH_FILTERED_TASK_ERROR,
  FETCH_FILTERED_TASK_RESULTS,
  FETCH_FILTERED_TASK_NEW_PAGE,
} from './constants';

/**
 * Fetch task start
 * @function fetchFilteredTaskStart
 * @returns {Object} contains the type
 */
export function fetchFilteredTaskStart(filter) {
  return {
    type: FETCH_FILTERED_TASK_START,
    filter
  };
}

/**
 * Fetch task error
 * @function fetchFilteredTaskError
 * @param filter
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchFilteredTaskError(filter, error) {
  return {
    type: FETCH_FILTERED_TASK_ERROR,
    error,
    filter
  };
}

/**
 * Fetch task data
 * @function searchTaskResults
 * @param filter
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchFilteredTaskData(filter, data) {
  return {
    type: FETCH_FILTERED_TASK_RESULTS,
    data,
    filter
  };
}

export function fetchFilteredTaskNewPage(filter, page) {
  return {
    type: FETCH_FILTERED_TASK_NEW_PAGE,
    filter,
    page
  };
}
