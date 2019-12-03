import {
  SEARCH_CALENDAR_WIDGET_START,
  SEARCH_CALENDAR_WIDGET_ERROR,
  SEARCH_CALENDAR_WIDGET_RESULTS,
  FETCH_CALENDAR_WIDGET_START,
  FETCH_CALENDAR_WIDGET_ERROR,
  FETCH_CALENDAR_WIDGET_RESULTS,
  FETCH_CALENDAR_WIDGET_NEW_PAGE,
} from './constants';

/**
 * Search calendarWidget start
 * @function searchCalendarWidgetStart
 * @param {Object} data - search value and filters
 * @returns {Object} contains the type and value
 */
export function searchCalendarWidgetStart(data) {
  return {
    type: SEARCH_CALENDAR_WIDGET_START,
    data
  };
}

/**
 * Search calendarWidget error
 * @function searchCalendarWidgetError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function searchCalendarWidgetError(error) {
  return {
    type: SEARCH_CALENDAR_WIDGET_ERROR,
    error
  };
}

/**
 * Search calendarWidget results
 * @function searchCalendarWidgetResults
 * @param {Array} results - array results
 * @returns {Object} contains the type and results
 */
export function searchCalendarWidgetResults(results) {
  return {
    type: SEARCH_CALENDAR_WIDGET_RESULTS,
    results
  };
}

/**
 * Fetch calendarWidget start
 * @function fetchCalendarWidgetStart
 * @returns {Object} contains the type
 */
export function fetchCalendarWidgetStart() {
  return {
    type: FETCH_CALENDAR_WIDGET_START
  };
}

/**
 * Fetch calendarWidget error
 * @function fetchCalendarWidgetError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchCalendarWidgetError(error) {
  return {
    type: FETCH_CALENDAR_WIDGET_ERROR,
    error
  };
}

/**
 * Fetch calendarWidget data
 * @function searchCalendarWidgetResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchCalendarWidgetData(data) {
  return {
    type: FETCH_CALENDAR_WIDGET_RESULTS,
    data
  };
}

export function fetchCalendarWidgetNewPage(page) {
  return {
    type: FETCH_CALENDAR_WIDGET_NEW_PAGE,
    page
  };
}

