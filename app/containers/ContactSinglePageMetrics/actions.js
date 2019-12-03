import {
  FETCH_CONTACT_METRICS_START,
  FETCH_CONTACT_METRICS_ERROR,
  FETCH_CONTACT_METRICS_SUCCESS,
} from './constants';

/**
 * Fetch contact metrics start
 * @function fetchContactMetricsStart
 * @returns {Object} contains the type
 */
export function fetchContactMetricsStart(id) {
  return {
    type: FETCH_CONTACT_METRICS_START,
    id
  };
}

/**
 * Fetch contact metrics error
 * @function fetchContactMetricsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchContactMetricsError(error) {
  return {
    type: FETCH_CONTACT_METRICS_ERROR,
    error
  };
}

/**
 * Fetch contact metrics data
 * @function fetchContactMetricsSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchContactMetricsSuccess(data) {
  return {
    type: FETCH_CONTACT_METRICS_SUCCESS,
    data
  };
}
