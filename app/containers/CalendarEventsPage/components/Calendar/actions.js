import {
  SEARCH_CALENDAR_START,
  SEARCH_CALENDAR_ERROR,
  SEARCH_CALENDAR_RESULTS,
  FETCH_CALENDAR_START,
  FETCH_CALENDAR_ERROR,
  FETCH_CALENDAR_RESULTS,
  FETCH_CALENDAR_NEW_PAGE,
} from './constants';

/**
 * Search calendar start
 * @function searchCalendarStart
 * @param {Object} data - search value and filters
 * @returns {Object} contains the type and value
 */
export function searchCalendarStart(data) {
  return {
    type: SEARCH_CALENDAR_START,
    data
  };
}

/**
 * Search calendar error
 * @function searchCalendarError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchCalendarError(error) {
  return {
    type: SEARCH_CALENDAR_ERROR,
    error
  };
}

/**
 * Search calendar results
 * @function searchCalendarResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchCalendarResults(results) {
  return {
    type: SEARCH_CALENDAR_RESULTS,
    results
  };
}

/**
 * Fetch calendar start
 * @function fetchCalendarStart
 * @returns {Object} contains the type
 */
export function fetchCalendarStart() {
  return {
    type: FETCH_CALENDAR_START
  };
}

/**
 * Fetch calendar error
 * @function fetchCalendarError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchCalendarError(error) {
  return {
    type: FETCH_CALENDAR_ERROR,
    error
  };
}

/**
 * Fetch calendar data
 * @function searchCalendarResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchCalendarData(data) {
  return {
    type: FETCH_CALENDAR_RESULTS,
    data
  };
}

export function fetchCalendarNewPage(page) {
  return {
    type: FETCH_CALENDAR_NEW_PAGE,
    page
  };
}

