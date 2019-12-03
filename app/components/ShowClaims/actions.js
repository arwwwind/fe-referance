import {
  SHOW_CLAIMS_START,
  SHOW_CLAIMS_ERROR,
  SHOW_CLAIMS_SUCCESS,
} from './constants';

/**
 * Show claims start
 * @function showClaimsStart
 * @param {Number} id
 * @returns {Object} contains the type and id
 */
export function showClaimsStart(id) {
  return {
    type: SHOW_CLAIMS_START,
    id
  };
}

/**
 * Show claims error
 * @function showClaimsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function showClaimsError(error) {
  return {
    type: SHOW_CLAIMS_ERROR,
    error
  };
}

/**
 * Show claims data
 * @function showClaimsSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function showClaimsSuccess(data) {
  return {
    type: SHOW_CLAIMS_SUCCESS,
    data
  };
}

