import { connect } from 'react-redux';
import { compose } from 'redux';
import { resetPasswordStart } from './actions';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import ResetPassword from './ResetPasswordPage';
import injectLoader from '../../utils/injectLoader';

/* dataToSend: {Object: email, password, passwordConfirmation} */
const mapDispatchToProps = (dispatch) => ({
  onResetPassword: (dataToSend) => dispatch(resetPasswordStart(dataToSend))
});

const mapStateToProps = (state) => ({
  loading: state.get('resetPassword').get('loading'),
  errors: state.get('resetPassword').get('error') ? state.get('resetPassword').get('error').toJS() : null
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'resetPassword', reducer });
const withSaga = injectSaga({ key: 'resetPassword', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(ResetPassword);
export { mapDispatchToProps };
