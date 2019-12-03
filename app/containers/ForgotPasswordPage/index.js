import { connect } from 'react-redux';
import { compose } from 'redux';
import { forgotPasswordStart } from './actions';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import ForgotPassword from './ForgotPasswordPage';
import injectLoader from '../../utils/injectLoader';

const mapDispatchToProps = (dispatch) => ({
  onForgotPassword: (email) => dispatch(forgotPasswordStart(email))
});

const mapStateToProps = (state) => ({
  loading: state.get('forgotPassword').get('loading'),
  success: state.get('forgotPassword').get('success')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'forgotPassword', reducer });
const withSaga = injectSaga({ key: 'forgotPassword', saga });
const withLoader = injectLoader();

export default compose(withReducer, withSaga, withConnect, withLoader)(ForgotPassword);
export { mapDispatchToProps };
