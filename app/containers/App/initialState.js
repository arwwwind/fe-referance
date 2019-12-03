import { fromJS } from 'immutable';

export default fromJS({
  token: null,
  user: null,
  loading: true,
  error: null,
  updateProfile: {
    image: null,
    loading: false,
    error: null
  },
  dropdown: false
});
