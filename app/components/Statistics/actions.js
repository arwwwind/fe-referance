import {
  FETCH_STATISTICS_START,
  FETCH_STATISTICS_ERROR,
  FETCH_STATISTICS_RESULTS,
  FETCH_STATISTICS_NEW_PAGE,
} from './constants';

/**
 * Fetch statistics start
 * @function fetchStatisticsStart
 * @returns {Object} contains the type
 */
export function fetchStatisticsStart() {
  return {
    type: FETCH_STATISTICS_START
  };
}

/**
 * Fetch statistics error
 * @function fetchStatisticsError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function fetchStatisticsError(error) {
  return {
    type: FETCH_STATISTICS_ERROR,
    error
  };
}

/**
 * Fetch statistics data
 * @function searchStatisticsResults
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function fetchStatisticsData(data) {
  return {
    type: FETCH_STATISTICS_RESULTS,
    data
  };
}

export function fetchStatisticsNewPage(page) {
  return {
    type: FETCH_STATISTICS_NEW_PAGE,
    page
  };
}

