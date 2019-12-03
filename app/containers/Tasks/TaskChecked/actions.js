import {
  TASK_CHECKED_START,
  TASK_CHECKED_SUCCESS,
  TASK_CHECKED_ERROR
} from './constants';

/**
 * Task checked start
 * @function taskCheckedStart
 * @param {number} id
 * @returns {Object} contains the type and id
 */
export function taskCheckedStart(id, checked) {
  return {
    type: TASK_CHECKED_START,
    id,
    checked
  };
}

/**
 * Task checked data
 * @function taskCheckedData
 * @returns {Object} contains the type
 */
export function taskCheckedSuccess() {
  return {
    type: TASK_CHECKED_SUCCESS
  };
}

/**
 * Task checked error
 * @function taskCheckedError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function taskCheckedError(error) {
  return {
    type: TASK_CHECKED_ERROR,
    error
  };
}
