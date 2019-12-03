import {
  FETCH_SINGLE_CONTACT_START,
  FETCH_SINGLE_CONTACT_ERROR,
  FETCH_SINGLE_CONTACT_SUCCESS,
  CONTACT_OVERVIEW_START,
  CONTACT_OVERVIEW_ERROR,
  CONTACT_OVERVIEW_SUCCESS
} from './constants';

/**
 * Fetch contact details start
 * @function fetchSingleContactStart
 * @returns {Object} contains the type
 */
export function fetchSingleContactStart(id) {
  return {
    type: FETCH_SINGLE_CONTACT_START,
    id
  };
}

/**
 * Fetch contact details error
 * @function fetchSingleContactError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchSingleContactError(error) {
  return {
    type: FETCH_SINGLE_CONTACT_ERROR,
    error
  };
}

/**
 * Fetch contact details data
 * @function fetchSingleContactSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchSingleContactSuccess(data) {
  return {
    type: FETCH_SINGLE_CONTACT_SUCCESS,
    data
  };
}

/**
 * Contact overview start
 * @function contactOverviewStart
 * @returns {Object} contains the type
 */
export function contactOverviewStart(id) {
  return {
    type: CONTACT_OVERVIEW_START,
    id
  };
}

/**
 * Contact overview error
 * @function contactOverviewError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function contactOverviewError(error) {
  return {
    type: CONTACT_OVERVIEW_ERROR,
    error
  };
}

/**
 * Contact overview data
 * @function contactOverviewSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function contactOverviewSuccess(id, data) {
  return {
    type: CONTACT_OVERVIEW_SUCCESS,
    id,
    data
  };
}
