import { fromJS } from 'immutable';

export const slice = fromJS({
  data: [],
  limit: 10,
  search: {
    loading: false,
    searchValue: null,
    error: null
  },
  fetch: {
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
    add: {
      data: null,
      loading: false,
      error: null
    }
  }
});

export default fromJS({});
