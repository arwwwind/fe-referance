import {
  SAVE_EVENT_RATE_START,
  SAVE_EVENT_RATE_SUCCESS,
  SAVE_EVENT_RATE_ERROR,
  SINGLE_EVENT_RATE_START,
  SINGLE_EVENT_RATE_SUCCESS,
  SINGLE_EVENT_RATE_ERROR,
} from './constants';

/**
* Fetch event rate start
* @function singleEventRateStart
* @returns {Object} contains the type
*/
export function singleEventRateStart(eventId) {
  return {
    type: SINGLE_EVENT_RATE_START,
    eventId
  };
}

/**
 * Fetch event rate error
 * @function singleEventRateError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleEventRateError(error) {
  return {
    type: SINGLE_EVENT_RATE_ERROR,
    error
  };
}

/**
 * Fetch event rate data
 * @function searchEventRateResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleEventRateSuccess(data) {
  return {
    type: SINGLE_EVENT_RATE_SUCCESS,
    data
  };
}

/**
 * Form event rate send
 * @returns {Object} contains the type, data and form
 */
export function saveEventRateStart(data, form, eventId) {
  return {
    type: SAVE_EVENT_RATE_START,
    data,
    form,
    eventId
  };
}

/**
 * Create event rate success
 * @function saveEventRateSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveEventRateSuccess(data) {
  return {
    type: SAVE_EVENT_RATE_SUCCESS,
    data
  };
}

/**
 * Create event rate error
 * @function saveEventRateError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveEventRateError(error) {
  return {
    type: SAVE_EVENT_RATE_ERROR,
    error
  };
}
