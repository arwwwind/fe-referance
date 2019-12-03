import { fromJS } from 'immutable';
import { DEFAULT_VIEW } from './components/QuickView';

export default fromJS({
  data: [],
  id: null,
  search: {
    quickView: DEFAULT_VIEW,
    results: [],
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
    type: undefined,
    data: null,
    loading: false,
    error: null
  }
});
