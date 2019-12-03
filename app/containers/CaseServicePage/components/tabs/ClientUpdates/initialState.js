import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  fetch: {
    searchValue: null,
    loading: false,
    error: null,
    currentPage: 1
  }
});
