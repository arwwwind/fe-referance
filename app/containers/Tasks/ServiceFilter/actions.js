import { CHANGE_FILTER_VALUE } from './constants';

export function changeFilterValue(to) {
  return {
    type: CHANGE_FILTER_VALUE,
    to
  };
}
