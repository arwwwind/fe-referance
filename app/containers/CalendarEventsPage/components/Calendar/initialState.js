import { fromJS } from 'immutable';

export default fromJS({
  data: [],
  id: null,
  search: {
    results: [],
    loading: false,
    searchValue: {
      searchValue: null,
      serviceFilterValue: null,
      repFilterValue: null,
      venueFilterValue: null
    },
    error: null
  },
  fetch: {
    loading: false,
    error: null,
    currentPage: 1
  }
});
