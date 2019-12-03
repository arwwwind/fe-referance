import {
  FETCH_CASE_METRICS_START,
  FETCH_CASE_METRICS_ERROR,
  FETCH_CASE_METRICS_SUCCESS,
} from './constants';

/**
 * Fetch case metrics start
 * @function fetchCaseMetricsStart
 * @returns {Object} contains the type
 */
export function fetchCaseMetricsStart(id) {
  return {
    type: FETCH_CASE_METRICS_START,
    id
  };
}

/**
 * Fetch case metrics error
 * @function fetchCaseMetricsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchCaseMetricsError(error) {
  return {
    type: FETCH_CASE_METRICS_ERROR,
    error
  };
}

/**
 * Fetch case metrics data
 * @function fetchCaseMetricsSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchCaseMetricsSuccess(data) {
  return {
    type: FETCH_CASE_METRICS_SUCCESS,
    data
  };
}
