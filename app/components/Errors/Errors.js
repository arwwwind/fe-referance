import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';

/**
 * Returns the errors list
 * @function prepareErrors
 * @param {Object} errors - object
 * @returns {Array}
 */
const prepareErrors = (errors) => {
  const result = [];
  if (_.isObject(errors)) {
    Object.keys(errors).forEach((key) => {
      if (_.isArray(errors[key])) {
        errors[key].forEach((error) => {
          result.push(error);
        });
      }
    });
  }
  return result;
};

/**
 * Renders error items component
 * @function ErrorList
 * @param {Array} props.errors - errors list
 * @returns {string || null} HTML markup for the component
 */
const ErrorList = (props) => {
  const { errors } = props;
  const listErrors = errors.map((error) => (<li key={error}>{error}</li>));
  return listErrors.length ? <ul className={classNames(props.className, 'juvo-errors')}>{listErrors}</ul> : null;
};

/**
 * Renders errors component
 * @function Errors
 * @param {Array} props.errors - errors list
 * @returns {string || null} HTML markup for the component
 */
const Errors = (props) => {
  const errors = prepareErrors(props.errors);
  return errors.length ? <ErrorList errors={errors} className={props.className} /> : null;
};

export default Errors;
