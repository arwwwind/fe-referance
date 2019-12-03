import { connect } from 'react-redux';
import { compose } from 'redux';
import { loginStart } from '../App/actions';
import LoginPage from './LoginPage';
import injectLoader from '../../utils/injectLoader';

const mapDispatchToProps = (dispatch) => ({
  onLogin: (credentials) => dispatch(loginStart(credentials))
});

const mapStateToProps = (state) => ({
  app: state.get('app')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withLoader = injectLoader();

export default compose(withConnect, withLoader)(LoginPage);
export { mapDispatchToProps };
