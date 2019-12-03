import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from './constants';

/**
 * Reset password start
 * @function resetPasswordStart
 * @param {Object} data - object data
 * @returns {Object} contains the type and password object
 */
export function resetPasswordStart({ email, password, passwordConfirmation }) {
  return {
    type: RESET_PASSWORD_START,
    email,
    password,
    passwordConfirmation
  };
}

/**
 * Reset password success
 * @function resetPasswordSuccess
 * @param {Array} data - array data
 * @returns {Object} contains the type and data
 */
export function resetPasswordSuccess(data) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data
  };
}

/**
 * Reset password error
 * @function resetPasswordError
 * @param {Object} error - object error
 * @returns {Object} contains the type and error
 */
export function resetPasswordError(error) {
  return {
    type: RESET_PASSWORD_ERROR,
    error
  };
}
