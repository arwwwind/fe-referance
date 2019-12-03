import {
  SINGLE_TASK_START,
  SINGLE_TASK_ERROR,
  SINGLE_TASK_RESULTS,
  SAVE_TASK_START,
  SAVE_TASK_SUCCESS,
  SAVE_TASK_ERROR,
} from './constants';

/**
 * Fetch case error
 * @function singleTaskError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleTaskError(error) {
  return {
    type: SINGLE_TASK_ERROR,
    error
  };
}

/**
 * Fetch case data
 * @function searchTaskResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleTaskData(data) {
  return {
    type: SINGLE_TASK_RESULTS,
    data
  };
}

/**
 * Fetch case start
 * @function singleCaseStart
 * @returns {Object} contains the type
 */
export function singleTaskStart(id) {
  return {
    type: SINGLE_TASK_START,
    id
  };
}

/**
 * Form case send
 * @function formTaskSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveTaskStart(data, form) {
  return {
    type: SAVE_TASK_START,
    data,
    form
  };
}

/**
 * Create case success
 * @function saveTaskSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveTaskSuccess(data) {
  return {
    type: SAVE_TASK_SUCCESS,
    data
  };
}

/**
 * Create case error
 * @function saveTaskError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveTaskError(error) {
  return {
    type: SAVE_TASK_ERROR,
    error
  };
}

