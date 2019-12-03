import {
  FETCH_LIENS_START,
  FETCH_LIENS_RESULT,
  FETCH_LIENS_ERROR,
  EDIT_LIENS_START,
  EDIT_LIENS_RESULT,
  EDIT_LIENS_ERROR
} from './constants';

export function fetchLiensStart(id) {
  return {
    type: FETCH_LIENS_START,
    id
  };
}
export function fetchLiensData(data, chartData, overlapDays, amountOwned, savings) {
  return {
    type: FETCH_LIENS_RESULT,
    data,
    chartData,
    overlapDays,
    amountOwned,
    savings
  };
}
export function fetchLiensError(error) {
  return {
    type: FETCH_LIENS_ERROR,
    error
  };
}
export function editLiensStart(id, data, form, onClose) {
  return {
    type: EDIT_LIENS_START,
    id,
    data,
    form,
    onClose
  };
}
export function editLiensData(data) {
  return {
    type: EDIT_LIENS_RESULT,
    data
  };
}
export function editLiensError(error) {
  return {
    type: EDIT_LIENS_ERROR,
    error
  };
}
