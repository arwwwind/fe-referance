import moment from 'moment';
import isNumber from 'lodash/isNumber';
import isUndefined from 'lodash/isUndefined';
import isNaN from 'lodash/isNaN';
import isBoolean from 'lodash/isBoolean';
import config from '../config';
import { getLabelByValue } from '../containers/CaseSinglePage/components/SaveService/types';

export const stringToText = (string) => string || '-';

export const checkValidValue = (value) => value !== undefined && value !== null;

export const formatDate = (date, format = 'MM/DD/YYYY') => (date ? moment(date).format(format) : null);

export const convertToMoment = (stringDate, format) => (stringDate ? moment(stringDate, format) : null);

export const formatPhone = (type, number, extension) => {
  if (!type && !number && !extension) {
    return null;
  }

  return `${type ? `(${type})` : ''} ${number || ''} ${(extension && (number || type)) ? ' - ' : ''} ${extension || ''}`;
};

export const getName = (row) => {
  let { firstName, lastName } = row;

  if (!firstName) {
    firstName = '';
  }

  if (!lastName) {
    lastName = '';
  }

  return (firstName || lastName) ? `${firstName} ${lastName}` : '-';
};

export const formatMetricsValue = (value, decimals = 2, stringToReturn = '-') => {
  const countDecimals = (valueToCheck) => {
    if (Math.floor(valueToCheck) !== valueToCheck) {
      return value.toString().split('.')[1].length || 0;
    }
    return 0;
  };

  if (!isUndefined(value)) {
    const valueNumber = parseFloat(value);
    if (isNumber(valueNumber) && !isNaN(valueNumber)) {
      if (countDecimals(valueNumber) > decimals) {
        return valueNumber.toFixed(decimals);
      }
      return valueNumber;
    }
    return stringToReturn;
  }
  return stringToReturn;
};

export const valueOrUndefined = (value) => ((value || isNumber(value) || isBoolean(value)) ? value : undefined);

export const generateFaxLink = (fax) => (fax ? `${fax}${config.faxLinkDomain}` : undefined);

export const generateServiceName = (injuredWorker, serviceType, id) => {
  let result = injuredWorker ? `${injuredWorker.firstName} ${injuredWorker.lastName}` : '';

  if (serviceType) {
    result = `${result ? `${result}-` : ''}${serviceType}`;
  }

  if (id) {
    result = `${result ? `${result}-` : ''}${id}`;
  }

  return result;
};

export const serviceSelectTextAccessor = (option) => {
  const injuredWorker = option.case ? option.case.injuredWorker : null;
  return generateServiceName(injuredWorker, getLabelByValue(option.serviceType || option.service.serviceType), option.id);
};

export const convertToString = (value) => ((value || isNumber(value) || isBoolean(value)) ? value.toString() : undefined);

export const addDollarSign = (value) => ((value || isNumber(value)) ? `$${value}` : '-');

export const addPercentageSign = (value) => ((value || isNumber(value)) ? `${value}%` : '-');
