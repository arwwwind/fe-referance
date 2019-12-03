import {
  SAVE_EVENT_START,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_ERROR,
  SINGLE_EVENT_START,
  SINGLE_EVENT_SUCCESS,
  SINGLE_EVENT_ERROR,
} from './constants';

/**
* Fetch event start
* @function singleEventStart
* @returns {Object} contains the type
*/
export function singleEventStart(eventId) {
  return {
    type: SINGLE_EVENT_START,
    eventId
  };
}

/**
 * Fetch event error
 * @function singleEventError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleEventError(error) {
  return {
    type: SINGLE_EVENT_ERROR,
    error
  };
}

/**
 * Fetch event data
 * @function searchEventResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleEventSuccess(data) {
  return {
    type: SINGLE_EVENT_SUCCESS,
    data
  };
}

/**
 * Form event send
 * @returns {Object} contains the type, data and form
 */
export function saveEventStart(data, form, eventId) {
  return {
    type: SAVE_EVENT_START,
    data,
    form,
    eventId
  };
}

/**
 * Create event success
 * @function saveEventSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveEventSuccess(data) {
  return {
    type: SAVE_EVENT_SUCCESS,
    data
  };
}

/**
 * Create event error
 * @function saveEventError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveEventError(error) {
  return {
    type: SAVE_EVENT_ERROR,
    error
  };
}
