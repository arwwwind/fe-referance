import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  id: null,
  search: {
    results: [],
    loading: false,
    searchValue: '',
    error: null
  },
  fetch: {
    loading: false,
    error: null,
    currentPage: 1
  }
});
