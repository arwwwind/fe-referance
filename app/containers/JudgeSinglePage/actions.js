import {
  FETCH_SINGLE_JUDGE_START,
  FETCH_SINGLE_JUDGE_ERROR,
  FETCH_SINGLE_JUDGE_SUCCESS,
  JUDGE_OVERVIEW_START,
  JUDGE_OVERVIEW_ERROR,
  JUDGE_OVERVIEW_SUCCESS
} from './constants';

/**
 * Fetch judge details start
 * @function fetchSingleJudgeStart
 * @returns {Object} contains the type
 */
export function fetchSingleJudgeStart() {
  return {
    type: FETCH_SINGLE_JUDGE_START
  };
}

/**
 * Fetch judge details error
 * @function fetchSingleJudgeError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchSingleJudgeError(error) {
  return {
    type: FETCH_SINGLE_JUDGE_ERROR,
    error
  };
}

/**
 * Fetch judge details data
 * @function fetchSingleJudgeSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchSingleJudgeSuccess(data) {
  return {
    type: FETCH_SINGLE_JUDGE_SUCCESS,
    data
  };
}

/**
 * Judge overview start
 * @function judgeOverviewStart
 * @returns {Object} contains the type
 */
export function judgeOverviewStart(id) {
  return {
    type: JUDGE_OVERVIEW_START,
    id
  };
}

/**
 * Judge overview error
 * @function judgeOverviewError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function judgeOverviewError(error) {
  return {
    type: JUDGE_OVERVIEW_ERROR,
    error
  };
}

/**
 * Judge overview data
 * @function judgeOverviewSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function judgeOverviewSuccess(id, data) {
  return {
    type: JUDGE_OVERVIEW_SUCCESS,
    id,
    data
  };
}
