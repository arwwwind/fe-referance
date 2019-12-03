import {
  FETCH_TASK_START,
  FETCH_TASK_ERROR,
  FETCH_TASK_RESULTS,
  FETCH_TASK_NEW_PAGE,
} from './constants';

/**
 * Fetch task start
 * @function fetchTaskStart
 * @returns {Object} contains the type
 */
export function fetchTaskStart() {
  return {
    type: FETCH_TASK_START
  };
}

/**
 * Fetch task error
 * @function fetchTaskError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchTaskError(error) {
  return {
    type: FETCH_TASK_ERROR,
    error
  };
}

/**
 * Fetch task data
 * @function searchTaskResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchTaskData(data) {
  return {
    type: FETCH_TASK_RESULTS,
    data
  };
}

export function fetchTaskNewPage(page) {
  return {
    type: FETCH_TASK_NEW_PAGE,
    page
  };
}
