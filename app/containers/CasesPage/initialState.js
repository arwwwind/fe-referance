import { fromJS } from 'immutable';
import { DEFAULT_VIEW } from './components/QuickView';

export default fromJS({
  data: [],
  fetch: {
    quickView: DEFAULT_VIEW,
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
  }
});
