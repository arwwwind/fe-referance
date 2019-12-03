import { connect } from 'react-redux';
import { compose } from 'redux';
import { logoutStart } from '../../containers/App/actions';
import Header from './Header';

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logoutStart())
});

const mapStateToProps = (state) => ({
  user: state.get('app').toJS().user
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Header);
export { mapDispatchToProps };

