import { connect } from 'react-redux';
import { compose } from 'redux';
import { updateProfileStart } from '../../containers/App/actions';
import Page from './components/Page';
import injectLoader from '../../utils/injectLoader';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data, form) => dispatch(updateProfileStart(data, form))
});

const mapStateToProps = (state) => ({
  profile: {
    user: state.get('app').toJS().user,
    loading: state.get('app').toJS().updateProfile.loading
  }
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withLoader = injectLoader();

export default compose(withConnect, withLoader)(Page);
export { mapDispatchToProps };

