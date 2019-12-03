import {
  SINGLE_SERVICE_START,
  SINGLE_SERVICE_ERROR,
  SINGLE_SERVICE_RESULTS,
  SAVE_SERVICE_START,
  SAVE_SERVICE_SUCCESS,
  SAVE_SERVICE_ERROR,
  GO_TO_STEP,
} from './constants';

/**
 * Fetch service start
 * @function singleServiceStart
 * @param serviceId
 * @param caseId
 * @returns {Object} contains the type
 */
export function singleServiceStart(serviceId, caseId) {
  return {
    type: SINGLE_SERVICE_START,
    serviceId,
    caseId
  };
}

/**
 * Fetch service error
 * @function singleServiceError
 * @param serviceId
 * @param caseId
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function singleServiceError(serviceId, caseId, error) {
  return {
    type: SINGLE_SERVICE_ERROR,
    error,
    serviceId,
    caseId
  };
}

/**
 * Fetch service data
 * @function singleServiceData
 * @param serviceId
 * @param caseId
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function singleServiceData(serviceId, caseId, data) {
  return {
    type: SINGLE_SERVICE_RESULTS,
    serviceId,
    caseId,
    data
  };
}

/**
 * Form service send
 * @function saveServiceStart
 * @param serviceId
 * @param caseId
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveServiceStart(serviceId, caseId, data, form) {
  return {
    type: SAVE_SERVICE_START,
    data,
    form,
    serviceId,
    caseId
  };
}

/**
 * Create service success
 * @function saveServiceSuccess
 * @param serviceId
 * @param caseId
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function saveServiceSuccess(serviceId, caseId, data) {
  return {
    type: SAVE_SERVICE_SUCCESS,
    serviceId,
    caseId,
    data
  };
}

/**
 * Create service error
 * @function saveServiceError
 * @param serviceId
 * @param caseId
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function saveServiceError(serviceId, caseId, error) {
  return {
    type: SAVE_SERVICE_ERROR,
    serviceId,
    caseId,
    error
  };
}

export function goToStep(number) {
  return {
    type: GO_TO_STEP,
    step: number
  };
}
