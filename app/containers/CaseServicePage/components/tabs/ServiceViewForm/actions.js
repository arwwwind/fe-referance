import {
  SAVE_SERVICE_VIEW_START,
  SAVE_SERVICE_VIEW_SUCCESS,
  SAVE_SERVICE_VIEW_ERROR,
  SINGLE_SERVICE_VIEW_START,
  SINGLE_SERVICE_VIEW_SUCCESS,
  SINGLE_SERVICE_VIEW_ERROR,
} from './constants';

/**
* Fetch service view start
* @function singleServiceViewStart
* @returns {Object} contains the type
*/
export function singleServiceViewStart(serviceId, caseId, name) {
  return {
    type: SINGLE_SERVICE_VIEW_START,
    serviceId,
    caseId,
    name
  };
}

/**
 * Fetch service view error
 * @function singleServiceViewError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleServiceViewError(error) {
  return {
    type: SINGLE_SERVICE_VIEW_ERROR,
    error
  };
}

/**
 * Fetch service view data
 * @function searchServiceViewResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleServiceViewData(data) {
  return {
    type: SINGLE_SERVICE_VIEW_SUCCESS,
    data
  };
}

/**
 * Form service view send
 * @function formServiceViewSend
 * @param serviceType
 * @param {Array} data
 * @param {Object} form
 * @param {Number} serviceId
 * @param {Number} caseId
 * @param {String} name
 * @returns {Object} contains the type, data and form
 */
export function saveServiceViewStart(serviceType, data, form, serviceId, caseId, name) {
  return {
    type: SAVE_SERVICE_VIEW_START,
    data,
    form,
    serviceId,
    caseId,
    name,
    serviceType
  };
}

/**
 * Create service view success
 * @function saveServiceViewSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveServiceViewSuccess(data) {
  return {
    type: SAVE_SERVICE_VIEW_SUCCESS,
    data
  };
}

/**
 * Create service view error
 * @function saveServiceViewError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveServiceViewError(error) {
  return {
    type: SAVE_SERVICE_VIEW_ERROR,
    error
  };
}
