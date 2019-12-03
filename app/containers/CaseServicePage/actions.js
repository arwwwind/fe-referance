import {
  FETCH_SERVICE_START,
  FETCH_SERVICE_ERROR,
  FETCH_SERVICE_SUCCESS,
} from './constants';

/**
 * Fetch service details start
 * @function fetchServiceStart
 * @returns {Object} contains the type
 */
export function fetchServiceStart() {
  return {
    type: FETCH_SERVICE_START
  };
}

/**
 * Fetch service details error
 * @function fetchServiceError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchServiceError(error) {
  return {
    type: FETCH_SERVICE_ERROR,
    error
  };
}

/**
 * Fetch service details data
 * @function fetchServiceData
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchServiceData(data) {
  return {
    type: FETCH_SERVICE_SUCCESS,
    data
  };
}
