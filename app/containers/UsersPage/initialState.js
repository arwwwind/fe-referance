import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  id: null,
  search: {
    results: [],
    loading: false,
    searchValue: null,
    error: null
  },
  fetch: {
    loading: false,
    error: null
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
  switchUserStatus: {
    loading: false,
    error: null
  }
});
