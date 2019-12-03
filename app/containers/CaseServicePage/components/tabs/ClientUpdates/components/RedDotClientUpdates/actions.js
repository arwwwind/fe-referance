import {
  STATUS_CLIENT_UPDATES_START,
  STATUS_CLIENT_UPDATES_ERROR,
  STATUS_CLIENT_UPDATES_SUCCESS,
} from './constants';

/**
 * Status client updates start
 * @function statusClientUpdatesStart
 * @param {number} caseId
 * @param {number} serviceId
 * @returns {Object} contains the type
 */
export function statusClientUpdatesStart(caseId, serviceId) {
  return {
    type: STATUS_CLIENT_UPDATES_START,
    caseId,
    serviceId
  };
}

/**
 * Status client updates error
 * @function statusClientUpdatesError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function statusClientUpdatesError(error) {
  return {
    type: STATUS_CLIENT_UPDATES_ERROR,
    error
  };
}

/**
 * Status client updates data
 * @function statusClientUpdatesData
 * @param {boolean} redDot
 * @param {object} lastUpdate - format (MMMM D)
 * @param {object} nextUpdate - format (MMMM D)
 * @param {number || null} daysOverdue
 * @returns {Object} contains the type and data
 */
export function statusClientUpdatesData({
  redDot, lastUpdate, nextUpdate, daysOverdue
}) {
  return {
    type: STATUS_CLIENT_UPDATES_SUCCESS,
    redDot,
    lastUpdate,
    nextUpdate,
    daysOverdue
  };
}
