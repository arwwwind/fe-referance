import {
  SEARCH_JUDGE_START,
  SEARCH_JUDGE_ERROR,
  SEARCH_JUDGE_RESULTS,
  FETCH_JUDGE_START,
  FETCH_JUDGE_ERROR,
  FETCH_JUDGE_RESULTS,
  SINGLE_JUDGE_START,
  SINGLE_JUDGE_ERROR,
  SINGLE_JUDGE_RESULTS,
  SAVE_JUDGE_START,
  SAVE_JUDGE_SUCCESS,
  SAVE_JUDGE_ERROR,
  DELETE_JUDGE_START,
  DELETE_JUDGE_SUCCESS,
  DELETE_JUDGE_ERROR,
  FETCH_JUDGE_NEW_PAGE,
} from './constants';

/**
 * Search judge start
 * @function searchJudgeStart
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchJudgeStart(value) {
  return {
    type: SEARCH_JUDGE_START,
    value
  };
}

/**
 * Search judge error
 * @function searchJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchJudgeError(error) {
  return {
    type: SEARCH_JUDGE_ERROR,
    error
  };
}

/**
 * Search judge results
 * @function searchJudgeResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchJudgeResults(results) {
  return {
    type: SEARCH_JUDGE_RESULTS,
    results
  };
}

/**
 * Fetch judge start
 * @function singleJudgeStart
 * @returns {Object} contains the type
 */
export function singleJudgeStart(id) {
  return {
    type: SINGLE_JUDGE_START,
    id
  };
}

/**
 * Fetch judge error
 * @function singleJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleJudgeError(error) {
  return {
    type: SINGLE_JUDGE_ERROR,
    error
  };
}

/**
 * Fetch judge data
 * @function searchJudgeResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleJudgeData(data) {
  return {
    type: SINGLE_JUDGE_RESULTS,
    data
  };
}

/**
 * Fetch judge start
 * @function fetchJudgeStart
 * @returns {Object} contains the type
 */
export function fetchJudgeStart() {
  return {
    type: FETCH_JUDGE_START
  };
}

/**
 * Fetch judge error
 * @function fetchJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchJudgeError(error) {
  return {
    type: FETCH_JUDGE_ERROR,
    error
  };
}

/**
 * Fetch judge data
 * @function searchJudgeResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchJudgeData(data) {
  return {
    type: FETCH_JUDGE_RESULTS,
    data
  };
}

export function fetchJudgeNewPage(page) {
  return {
    type: FETCH_JUDGE_NEW_PAGE,
    page
  };
}

/**
 * Form judge send
 * @function formJudgeSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveJudgeStart(data, form) {
  return {
    type: SAVE_JUDGE_START,
    data,
    form
  };
}

/**
 * Create judge success
 * @function saveJudgeSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveJudgeSuccess(data) {
  return {
    type: SAVE_JUDGE_SUCCESS,
    data
  };
}

/**
 * Create judge error
 * @function saveJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveJudgeError(error) {
  return {
    type: SAVE_JUDGE_ERROR,
    error
  };
}

/**
 * Delete judge send
 * @function deleteJudgeStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteJudgeStart(id) {
  return {
    type: DELETE_JUDGE_START,
    id
  };
}

/**
 * Delete judge success
 * @function deleteJudgeSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteJudgeSuccess(data) {
  return {
    type: DELETE_JUDGE_SUCCESS,
    data
  };
}

/**
 * Delete judge error
 * @function deleteJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteJudgeError(error) {
  return {
    type: DELETE_JUDGE_ERROR,
    error
  };
}

