import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  fetch: {
    searchValue: null,
    loading: false,
    error: null,
    currentPage: 1
  },
  save: {
    data: null,
    loading: false,
    error: null
  },
  single: {
    data: null,
    loading: false,
    error: null
  },
  statistics: {
    data: {},
    loading: false,
    error: null
  },
  step: 1
});
