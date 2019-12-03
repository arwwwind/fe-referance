import {
  SEARCH_PERSON_EVENTS_START,
  SEARCH_PERSON_EVENTS_ERROR,
  SEARCH_PERSON_EVENTS_RESULTS,
  FETCH_PERSON_EVENTS_START,
  FETCH_PERSON_EVENTS_ERROR,
  FETCH_PERSON_EVENTS_RESULTS,
  SINGLE_PERSON_EVENTS_START,
  SINGLE_PERSON_EVENTS_ERROR,
  SINGLE_PERSON_EVENTS_RESULTS,
  SAVE_PERSON_EVENTS_START,
  SAVE_PERSON_EVENTS_SUCCESS,
  SAVE_PERSON_EVENTS_ERROR,
  DELETE_PERSON_EVENTS_START,
  DELETE_PERSON_EVENTS_SUCCESS,
  DELETE_PERSON_EVENTS_ERROR,
  FETCH_PERSON_EVENTS_NEW_PAGE,
} from './constants';

/**
 * Search personEvents start
 * @function searchPersonEventsStart
 * @param {String} value - search value
 * @returns {Object} contains the type and value
 */
export function searchPersonEventsStart(value) {
  return {
    type: SEARCH_PERSON_EVENTS_START,
    value
  };
}

/**
 * Search personEvents error
 * @function searchPersonEventsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchPersonEventsError(error) {
  return {
    type: SEARCH_PERSON_EVENTS_ERROR,
    error
  };
}

/**
 * Search personEvents results
 * @function searchPersonEventsResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchPersonEventsResults(results) {
  return {
    type: SEARCH_PERSON_EVENTS_RESULTS,
    results
  };
}

/**
 * Fetch personEvents start
 * @function singlePersonEventsStart
 * @returns {Object} contains the type
 */
export function singlePersonEventsStart(id) {
  return {
    type: SINGLE_PERSON_EVENTS_START,
    id
  };
}

/**
 * Fetch personEvents error
 * @function singlePersonEventsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singlePersonEventsError(error) {
  return {
    type: SINGLE_PERSON_EVENTS_ERROR,
    error
  };
}

/**
 * Fetch personEvents data
 * @function searchPersonEventsResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singlePersonEventsData(data) {
  return {
    type: SINGLE_PERSON_EVENTS_RESULTS,
    data
  };
}

/**
 * Fetch personEvents start
 * @function fetchPersonEventsStart
 * @returns {Object} contains the type
 */
export function fetchPersonEventsStart() {
  return {
    type: FETCH_PERSON_EVENTS_START
  };
}

/**
 * Fetch personEvents error
 * @function fetchPersonEventsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchPersonEventsError(error) {
  return {
    type: FETCH_PERSON_EVENTS_ERROR,
    error
  };
}

/**
 * Fetch personEvents data
 * @function searchPersonEventsResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchPersonEventsData(data) {
  return {
    type: FETCH_PERSON_EVENTS_RESULTS,
    data
  };
}

export function fetchPersonEventsNewPage(page) {
  return {
    type: FETCH_PERSON_EVENTS_NEW_PAGE,
    page
  };
}

/**
 * Form personEvents send
 * @function formPersonEventsSend
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function savePersonEventsStart(data, form) {
  return {
    type: SAVE_PERSON_EVENTS_START,
    data,
    form
  };
}

/**
 * Create personEvents success
 * @function savePersonEventsSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function savePersonEventsSuccess(data) {
  return {
    type: SAVE_PERSON_EVENTS_SUCCESS,
    data
  };
}

/**
 * Create personEvents error
 * @function savePersonEventsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function savePersonEventsError(error) {
  return {
    type: SAVE_PERSON_EVENTS_ERROR,
    error
  };
}

/**
 * Delete personEvents send
 * @function deletePersonEventsStart
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deletePersonEventsStart(id) {
  return {
    type: DELETE_PERSON_EVENTS_START,
    id
  };
}

/**
 * Delete personEvents success
 * @function deletePersonEventsSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function deletePersonEventsSuccess(data) {
  return {
    type: DELETE_PERSON_EVENTS_SUCCESS,
    data
  };
}

/**
 * Delete personEvents error
 * @function deletePersonEventsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function deletePersonEventsError(error) {
  return {
    type: DELETE_PERSON_EVENTS_ERROR,
    error
  };
}

