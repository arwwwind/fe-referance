import {
  SEARCH_VENUE_START,
  SEARCH_VENUE_ERROR,
  SEARCH_VENUE_RESULTS,
  FETCH_VENUE_START,
  FETCH_VENUE_ERROR,
  FETCH_VENUE_RESULTS,
  SINGLE_VENUE_START,
  SINGLE_VENUE_ERROR,
  SINGLE_VENUE_RESULTS,
  SAVE_VENUE_START,
  SAVE_VENUE_SUCCESS,
  SAVE_VENUE_ERROR,
  DELETE_VENUE_START,
  DELETE_VENUE_SUCCESS,
  DELETE_VENUE_ERROR,
  FETCH_VENUE_NEW_PAGE,
} from './constants';

/**
 * Search venue start
 * @function searchVenueStart
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchVenueStart(value) {
  return {
    type: SEARCH_VENUE_START,
    value
  };
}

/**
 * Search venue error
 * @function searchVenueError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchVenueError(error) {
  return {
    type: SEARCH_VENUE_ERROR,
    error
  };
}

/**
 * Search venue results
 * @function searchVenueResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchVenueResults(results) {
  return {
    type: SEARCH_VENUE_RESULTS,
    results
  };
}

/**
 * Fetch venue start
 * @function singleVenueStart
 * @returns {Object} contains the type
 */
export function singleVenueStart(id) {
  return {
    type: SINGLE_VENUE_START,
    id
  };
}

/**
 * Fetch venue error
 * @function singleVenueError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleVenueError(error) {
  return {
    type: SINGLE_VENUE_ERROR,
    error
  };
}

/**
 * Fetch venue data
 * @function searchVenueResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleVenueData(data) {
  return {
    type: SINGLE_VENUE_RESULTS,
    data
  };
}

/**
 * Fetch venue start
 * @function fetchVenueStart
 * @returns {Object} contains the type
 */
export function fetchVenueStart() {
  return {
    type: FETCH_VENUE_START
  };
}

/**
 * Fetch venue error
 * @function fetchVenueError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchVenueError(error) {
  return {
    type: FETCH_VENUE_ERROR,
    error
  };
}

/**
 * Fetch venue data
 * @function searchVenueResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchVenueData(data) {
  return {
    type: FETCH_VENUE_RESULTS,
    data
  };
}

export function fetchVenueNewPage(page) {
  return {
    type: FETCH_VENUE_NEW_PAGE,
    page
  };
}

/**
 * Form venue send
 * @function formVenueSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveVenueStart(data, form) {
  return {
    type: SAVE_VENUE_START,
    data,
    form
  };
}

/**
 * Create venue success
 * @function saveVenueSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveVenueSuccess(data) {
  return {
    type: SAVE_VENUE_SUCCESS,
    data
  };
}

/**
 * Create venue error
 * @function saveVenueError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveVenueError(error) {
  return {
    type: SAVE_VENUE_ERROR,
    error
  };
}

/**
 * Delete venue send
 * @function deleteVenueStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteVenueStart(id) {
  return {
    type: DELETE_VENUE_START,
    id
  };
}

/**
 * Delete venue success
 * @function deleteVenueSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deleteVenueSuccess(data) {
  return {
    type: DELETE_VENUE_SUCCESS,
    data
  };
}

/**
 * Delete venue error
 * @function deleteVenueError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deleteVenueError(error) {
  return {
    type: DELETE_VENUE_ERROR,
    error
  };
}

