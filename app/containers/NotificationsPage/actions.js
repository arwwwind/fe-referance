import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_ERROR,
  FETCH_NOTIFICATIONS_RESULTS,
  FETCH_NOTIFICATIONS_NEW_PAGE,
} from './constants';

/**
 * Fetch notifications start
 * @function fetchNotificationsStart
 * @returns {Object} contains the type
 */
export function fetchNotificationsStart() {
  return {
    type: FETCH_NOTIFICATIONS_START
  };
}

/**
 * Fetch notifications error
 * @function fetchNotificationsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchNotificationsError(error) {
  return {
    type: FETCH_NOTIFICATIONS_ERROR,
    error
  };
}

/**
 * Fetch notifications data
 * @function searchNotificationsResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchNotificationsData(data) {
  return {
    type: FETCH_NOTIFICATIONS_RESULTS,
    data
  };
}

export function fetchNotificationsNewPage(page) {
  return {
    type: FETCH_NOTIFICATIONS_NEW_PAGE,
    page
  };
}

